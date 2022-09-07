const { request } = require("../../../utils/request");

function submitInfo(data, cookie) {
  return request({
    method: 'post',
    url: 'http://ehall.gdou.edu.cn/xsfw/sys/xsyqxxsjapp/mrbpa/saveMrbpa.do',
    data,
    headers: {
      cookie
    }
  })
}

module.exports = submitInfo