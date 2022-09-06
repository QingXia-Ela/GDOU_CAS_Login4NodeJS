const encryptPwd = require('../utils/encryptoJS')
const getSaltAndExecution = require('../utils/getSaltAndExecution')
const login = require('../api/getAccountToken/login')
const changeSetCookie2Obj = require('../utils/changeSetCookie2Obj')

const getPage = require('../api/getAccountToken/getPage')

const { publicBody } = require('../constant/login')

// cookie 收集
const $cookieManager = require('../store/cookieManager')
const cookieCollect = new $cookieManager()

/**
 * 获取登陆期间所有获得的 cookie
 * @param {object} param0 携带 username 和 password 的对象
 * @returns {Promise<any>}
 */
function getAccountToken({ username, password }) {
  return new Promise((resolve, reject) => {
    if (!username || !password) reject({ msg: '输入信息不完整！' })
    getPage().then(async (res) => {
      try {

        const cookie = changeSetCookie2Obj(res.headers['set-cookie'])
        const { saltKey, execution } = getSaltAndExecution(res.data)
        const encryptedPwd = encryptPwd(password, saltKey)

        // cookies 对象转字符串
        let sendCookie = ''
        for (const i in cookie) {
          sendCookie += `${i}=${cookie[i].value}; `
          cookieCollect.setCookie(i, cookie[i])
        }
        // 登陆
        let loginBody = {
          username,
          password: encryptedPwd,
          execution,
          ...publicBody
        }
        if (1) {
          const resultData = await login(loginBody, sendCookie, cookieCollect)
          const lastCookie = changeSetCookie2Obj(resultData.headers['set-cookie'])
          if (lastCookie) for (const i in lastCookie) cookieCollect.setCookie(i, lastCookie[i])
          // 返回结果
          let res = {}
          cookieCollect.cookieMap.forEach((value, key) => {
            res[key] = value
          })
          resolve(res)
        }
      } catch (err) {
        reject(err)
      }
    }, err => {
      reject(err)
    })

  })
}

module.exports = getAccountToken