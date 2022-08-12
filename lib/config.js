class Config {
  constructor() {
    this.cfg = {
      peer: {},
      peers: [],
    }
  }

  set(name, value) {
    this.cfg[name] = value
  }

  regenerate() {
    this.cfg.peers = Object.keys(this.cfg.peer).sort()
  }

  get(name) {
    return this.cfg[name]
  }
}

export default Config
