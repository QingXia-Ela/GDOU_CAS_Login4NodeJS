class cookieManager {
  cookieMap = new Map()

  constructor(cookieObj) {
    this.insertCookieObj(cookieObj)
  }

  insertCookieObj = (cookieObj) => {
    for (const i in cookieObj) {
      if (cookieObj[i]) this.setCookie(i, cookieObj[i].value)
    }
  }

  getCookie = (key) => {
    return this.cookieMap.get(key)
  }

  setCookie = (key, value) => {
    if (key === 'lastUpdate') return
    this.cookieMap.set(key, value)
  }

  removeCookie = (key) => {
    this.cookieMap.delete(key)
  }

  getAllCookieStr = () => {
    let res = ''
    this.cookieMap.forEach(({ value }, key) => {
      res += `${key}=${value}; `
    })
    return res
  }
}

module.exports = cookieManager