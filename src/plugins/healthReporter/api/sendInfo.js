const request = require('../../../utils/request')

/**
 * 发送填报信息
 * @param {object} data 符合健康填报内容的object
 * @param {string} cookie 添加到请求头的 cookie 字符串
 * @returns {Promise<any>}
 */
function sendInfo(data, cookie) {
  if (!data) throw new Error('没有传入健康填报内容数据！')
  if (!cookie) throw new Error('发送信息时未传入必要的 cookie！')
  return request({
    method: 'post',
    url: 'http://ehall.gdou.edu.cn/xsfw/sys/xsyqxxsjapp/mrbpa/saveMrbpa.do',
    data,
    headers: {
      cookie
    }
  })
}

module.exports = sendInfo