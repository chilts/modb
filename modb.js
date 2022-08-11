// core
import http from 'http'

// npm
import fastify from 'fastify'

// local
import argv from './lib/argv.js'

// storage
const peer = {}
const kv = {}

// an app
const peerApp = fastify({ logger: true })

peerApp.get('/', async (request, reply) => {
  return { ok: true }
})

try {
  await peerApp.listen({ port: argv.peer.port })
} catch (err) {
  peerApp.log.error(err)
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
