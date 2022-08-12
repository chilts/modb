// npm
import fastify from 'fastify'
import fastifyFormBody from '@fastify/formbody'

function createServerPeer(env, argv, config, store) {
  const server = fastify({ logger: true })

  server.register(fastifyFormBody)

  server.get('/', async (request, reply) => {
    await reply.send({ ok: true })
  })

  server.get('/app/argv', async (request, reply) => {
    await reply.send(argv)
  })

  server.get('/app/config', async (request, reply) => {
    await reply.send(config.cfg)
  })

  server.get('/app/store', async (request, reply) => {
    await reply.send(store)
  })

  server.get('/peer/', async (request, reply) => {
    const peer = config.get('peer')
    await reply.send(peer)
  })

  server.post('/peer/', async (request, reply) => {
    const peer = config.get('peer')
    console.log('peer:', peer)
    peer[request.body.peer] = true
    console.log('request.body:', request.body)
    config.regenerate()
  })

  return server
}

export default createServerPeer
