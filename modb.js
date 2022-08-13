// npm
import fastify from 'fastify'
import ms from 'ms'
import got from 'got'

// local
import env from './lib/env.js'
import argv from './lib/argv.js'
import Config from './lib/config.js'
import Store from './lib/store.js'
import createServerPeer from './lib/create-server-peer.js'
import createServerApi from './lib/create-server-api.js'
import * as task from './lib/task.js'

// storage
const config = new Config()
const store = new Store()

// an app
const peerServer = createServerPeer(env, argv, config, store)

try {
  await peerServer.listen({ port: argv.peer.port })
}
catch (err) {
  peerServer.log.error(err)
  process.exit(1)
}

// the API
const apiServer = createServerApi(env, argv, config, store)

try {
  await apiServer.listen({ port: argv.api.port })
}
catch (err) {
  apiServer.log.error(err)
  process.exit(1)
}

// firstly, let's connect to all 'seeds'
console.log('argv:', argv)
task.contactSeeds(argv.seedUrls, config)

// connect to all peers regularly
const peerInterval = ms('15s')
function connectToAllPeers(config) {
  setTimeout(
    () => connectToAllPeers(config),
    ( peerInterval / 2 ) + ( peerInterval * Math.random() )
  )
  task.contactPeers(config.get('peers'), config)
}
connectToAllPeers(config)
