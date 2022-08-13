// local
import env from './env.js'

const argv = {
  seedUrls: [],
  peer: {
    url: null,
  },
  api: {
    url: null,
  },
}

// let's read in each argument
const rest = process.argv.slice(2)
for ( let i = 0; i < rest.length; i++ ) {
  const [ key, val ] = rest[i].split('=')
  console.log(`[${key}=${val}]`)

  if ( key === '--seed-url' ) {
    argv.seedUrls.push(val)
  }

  if ( key === '--peer-url' ) {
    argv.peer.url = val
  }

  if ( key === '--api-url' ) {
    argv.api.url = val
  }
}

// extract some stuff from the URLs
argv.peer.port = argv.peer.url.match(/\:(\d+)$/)[1]
argv.api.port = argv.api.url.match(/\:(\d+)$/)[1]

if ( env.isDev ) {
  console.log('argv:', argv)
}

export default argv
