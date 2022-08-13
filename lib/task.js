// npm
import got from 'got'

// local
import env from './env.js'
import argv from './argv.js'

export function contactSeeds(seeds, config) {
  console.log('contactSeeds() - seeds:', seeds)
  // firstly, let's connect to all these peers
  for (const seed of seeds) {
    console.log(`Trying ${seed}`)
    got.get(seed)
      .json()
      .then(data => {
        console.log('data:', data)
        if (!data.ok) {
          console.log("Error connecting to peer:", data.msg)
          return
        }
      })
      .then(() => {
        console.log("Now we'll add ourselves to the cluster via this seed")
        return got.post(`${seed}/peer/`, {
          form: {
            peer: argv.peer.url,
          },
        }).json()
      })
      .then(peers => {
        // console.log('config.peer:', config.get('peer'))
        for ( let p of peers ) {
          config.addPeer(p)
        }
        // console.log('config.peer:', config.get('peer'))
      })
  }
}

export function contactPeers(peerUrls, config) {
  console.log('contactPeerts() - peerUrls:', peerUrls)

  // firstly, let's connect to all these peers
  for (const peerUrl of peerUrls) {
    console.log(`Trying ${peerUrl}`)
    got.get(peerUrl)
      .json()
      .then(data => {
        console.log('data:', data)
        if (!data.ok) {
          console.log("Error connecting to peer:", data.msg)
        }
      })
      // .then(allPeers => {
      //   console.log('allPeers:', allPeers)
      //   // console.log('config.peer:', config.get('peer'))
      //   // for ( let p of allPeers ) {
      //   //   config.addPeer(p)
      //   // }
      //   // console.log('config.peer:', config.get('peer'))
      // })
  }
}
