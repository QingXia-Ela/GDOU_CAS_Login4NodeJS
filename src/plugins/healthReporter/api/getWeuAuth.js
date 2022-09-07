const { request } = require("../../../utils/request");



function getWeuAuth(cookie) {
  return request({
    method: 'get',
    url: 'http://ehall.gdou.edu.cn/xsfw/sys/swpubapp/indexmenu/getAppConfig.do',
    headers: {
      cookie
    }
  })
}

module.exports = getWeuAuth