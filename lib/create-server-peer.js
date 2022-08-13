// npm
import fastify from 'fastify'
import fastifyFormBody from '@fastify/formbody'

// local
import env from './env.js'

function createServerPeer(env, argv, config, store) {
  const server = fastify({ logger: true })

  server.register(fastifyFormBody)

  server.get('/', async (request, reply) => {
    await reply.send({ ok: true })
  })

  // just some app config
  if ( env.isDev ) {
    server.get('/app/argv', async (request, reply) => {
      await reply.send(argv)
    })

    server.get('/app/config', async (request, reply) => {
      await reply.send(config.cfg)
    })

    server.get('/app/store', async (request, reply) => {
      await reply.send(store.store)
    })
  }

  // peers
  server.get('/peer/', async (request, reply) => {
    const peers = config.get('peers')
    await reply.send(peers)
  })

  server.post('/peer/', async (request, reply) => {
    console.log(`Adding peer ${request.body.peer}`)
    config.addPeer(request.body.peer)
    await reply.send(config.get('peers'))
  })

  return server
}

export default createServerPeer
