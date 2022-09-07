const fs = require('fs')
const path = require('path')

const getAuth = require("./api/getAuth")
const getWeuAuth = require('./api/getWeuAuth')
const submitInfo = require('./api/submitInfo')

const $cookieCollector = require('../../store/cookieManager')
const changeSetCookie2Obj = require('../../utils/changeSetCookie2Obj')

const info = require('./config/info')

async function healthReporter(cookie) {
  const cookieCollector = new $cookieCollector(cookie)
  console.log('打卡助手开始运行');
  try {

    const CAS = cookieCollector.getCookie('MOD_AUTH_CAS')

    console.log('开始 第一次 认证');
    let info = await getAuth(`MOD_AUTH_CAS=${CAS};`)
    let newCookieObj = changeSetCookie2Obj(info.headers['set-cookie'])
    cookieCollector.insertCookieObj(newCookieObj)
    console.log(newCookieObj);

    console.log('开始 WEU 认证');
    let weuInfo = await getWeuAuth(cookieCollector.getAllCookieStr())
    let weuCookie = changeSetCookie2Obj(weuInfo.headers['set-cookie'])
    cookieCollector.insertCookieObj(weuCookie)
    console.log(weuCookie);
    // console.log(cookieCollector.cookieMap);

    console.log('开始提交打卡信息');
    let result = await submitInfo(info, cookieCollector.getAllCookieStr()).catch((err) => {
      console.log('err', err);
    })
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }

}

module.exports = healthReporter