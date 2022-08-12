// npm
import fastify from 'fastify'

// local
import env from './lib/env.js'
import argv from './lib/argv.js'
import Config from './lib/config.js'
import Store from './lib/store.js'
import createServerPeer from './lib/create-server-peer.js'

// storage
const config = new Config()
const store = new Store()

// an app
const peerServer = createServerPeer(env, argv, config, store)

try {
  await peerServer.listen({ port: argv.peer.port })
} catch (err) {
  peerServer.log.error(err)
  process.exit(1)
}

// the API
const apiApp = fastify({ logger: true })

apiApp.get('/', async (request, reply) => {
  return { ok: true }
})

try {
  await apiApp.listen({ port: argv.api.port })
} catch (err) {
  apiApp.log.error(err)
  process.exit(1)
}
