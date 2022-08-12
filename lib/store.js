class Store {
  constructor() {
    this.store = {}
  }

  put(key, val) {
    this.store[key] = val
  }

  get(key) {
    return this.store[key]
  }

  del(key) {
    delete this.store[key]
  }
}

export default Store
