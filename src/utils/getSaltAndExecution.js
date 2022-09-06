const cheerio = require('cheerio')
/**
 * 
 * @param {string} html 网页 html 字符串
 */
function getSaltAndExecution(html) {
  // 页面转换成 类似 jQuery 对象
  let $ = cheerio.load(html)
  // 选出 salt
  const saltKey = $('#pwdEncryptSalt').val()
  // 选出 execution
  const execution = $('#execution').val()

  return {
    saltKey,
    execution
  }
}

module.exports = getSaltAndExecution