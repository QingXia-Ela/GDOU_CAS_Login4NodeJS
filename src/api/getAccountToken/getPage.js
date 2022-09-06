const request = require('../../utils/request')

/**
 * 获取网页
 * @param {object} params 请求参数
 * @returns {Promise<any>} 网页原生字符串
 */
module.exports = function getPage(params) {
  return request({
    method: 'GET',
    url: 'http://authserver.gdou.edu.cn/authserver/login',
    params
  })
}