
/**
 * set-cookies 转对象
 * @param {string[]} cookies headers 中的 `set-cookies` 项
 * @returns {object} cookies 对象，key 对应 cookie 值和其相关设置，其 value 指向 cookie 源字符串
 */
function changeSetCookie2Obj(cookies) {
  const res = {}
  if (!cookies) return null
  cookies.forEach((value) => {
    let data = value.split('; ')
    let name = ''
    for (let i = 0; i < data.length; i++) {
      const ele = data[i].split('=');
      // cookie 内容
      if (i == 0) {
        name = ele[0]
        res[name] = {
          value: ele[1]
        }
      }
      else {
        res[name][ele[0]] = ele.length == 2 ? ele[1] : true
      }
    }
  })
  return res
}

module.exports = changeSetCookie2Obj