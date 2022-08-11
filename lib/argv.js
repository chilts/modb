const argv = {
  seeds: [],
  peer: {
    port: 52000,
  },
  api: {
    port: 53000,
  },
}

// let's read in each argument
const rest = process.argv.slice(2)
for ( let i = 0; i < rest.length; i++ ) {
  const [ key, val ] = rest[i].split('=')

  if ( key === '--seed' ) {
    argv.seeds.push(val)
  }
  if ( key === '--peer-port' ) {
    argv.peer.port = val
  }
  if ( key === '--api-port' ) {
    argv.api.port = val
  }
}

export default argv
