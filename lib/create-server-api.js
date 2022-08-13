// npm
import fastify from 'fastify'
import fastifyFormBody from '@fastify/formbody'

// local
import env from './env.js'

function createServerApi(env, argv, config, store) {
  const server = fastify({ logger: true })

  server.get('/', async (request, reply) => {
    return { ok: true }
  })

  return server
}

export default createServerApi
