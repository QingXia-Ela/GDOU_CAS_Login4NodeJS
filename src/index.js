const getAccountToken = require('./modules/getAccountToken')
const fs = require('fs')
const path = require('path')

const accountInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))

const healthReporter = require('./plugins/healthReporter')

fs.readFile(path.join(__dirname, './cacheCookie.json'), 'utf-8', async (err, data) => {
  if (err) {
    console.log(err);
    return
  }

  try {
    let res = JSON.parse(data)
    const lastUpdate = res['lastUpdate']

    // 判断缓存 cookie 是否无效，无效则进行获取，此处设置为 60 分钟
    if (!lastUpdate || (+new Date() - lastUpdate > 1000 * 60 * 60)) {
      // 获取新cookie
      console.log('cookie 已过期，正在获取新的cookie');
      res = await getAccountToken(accountInfo)
      let writeInfo = JSON.parse(JSON.stringify(res))
      writeInfo['lastUpdate'] = +new Date()
      fs.writeFileSync(path.join(__dirname, './cacheCookie.json'), JSON.stringify(writeInfo))
    }
    res['lastUpdate'] = undefined

    await healthReporter(res)
  } catch (err) {
    console.log('error:' + err);
    fs.writeFileSync(path.join(__dirname, './error.json'), JSON.stringify(err))
  }
})

