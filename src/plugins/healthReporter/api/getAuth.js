const request = require('../../../utils/request')

function getAuth(cookie) {
  return request({
    method: 'get',
    url: 'http://ehall.gdou.edu.cn/xsfw/sys/xsyqxxsjapp/*default/index.do',
    headers: {
      cookie
    }
  })
}

module.exports = getAuth