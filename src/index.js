const getAccountToken = require('./modules/getAccountToken')
const fs = require('fs')
const path = require('path')

const accountInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))

getAccountToken(accountInfo).then((res) => {
  // 6个 cookie
  console.log(res);
})
