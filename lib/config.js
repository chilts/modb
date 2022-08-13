class Config {
  constructor() {
    this.cfg = {
      peer: {},
      peers: [],
    }
  }

  get(name) {
    return this.cfg[name]
  }

  set(name, value) {
    this.cfg[name] = value
  }

  addPeer(peer) {
    this.cfg.peer[peer] = Date.now()
    this.regenerate()
  }

  regenerate() {
    this.cfg.peers = Object.keys(this.cfg.peer).sort()
  }
}

export default Config
