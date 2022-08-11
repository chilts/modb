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
  console.log(i, rest[i])
  const [ key, val ] = rest[i].split('=')
  console.log(key, val)

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
