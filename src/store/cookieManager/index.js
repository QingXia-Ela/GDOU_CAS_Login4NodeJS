class cookieManager {
  cookieMap = new Map()

  getCookie = (key) => {
    return this.cookieMap.get(key)
  }

  setCookie = (key, value) => {
    this.cookieMap.set(key, value)
  }

  removeCookie = (key) => {
    this.cookieMap.delete(key)
  }
}

module.exports = cookieManager