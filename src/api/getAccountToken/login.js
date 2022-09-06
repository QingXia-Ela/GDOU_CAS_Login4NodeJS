const request = require('../../utils/request')
const { publicHeader } = require('../../constant/login')

const changeSetCookie2Obj = require('../../utils/changeSetCookie2Obj')
const cookieManager = require('../../store/cookieManager')

/**
 * 登陆
 * @param {object} data 登陆数据，必须要有 `username, password, execution` , 其中 password 得是加密后的密码
 * @param {string} Cookie
 * @param {cookieManager} cookieManager store 下的 cookieManager 对象，用来捕获重定向请求中的所有 cookie
 * @returns 
 */
function login(data, Cookie, cookieManager) {
  return request({
    method: 'post',
    url: 'http://authserver.gdou.edu.cn/authserver/login',
    headers: {
      ...publicHeader,
      Cookie
    },
    data,
    // 环形重定向捕获cookie
    beforeRedirect: (options, details, curInfo) => {
      const cookie = changeSetCookie2Obj(details.headers['set-cookie'])
      if (cookie) for (const i in cookie) {
        options.headers['Cookie'] += `${i}=${cookie[i].value};`
        cookieManager.setCookie(i, cookie[i])
      }
    }
  })
}

module.exports = login