/**
 * @file 密码加密部分，于 2022/9/6 参照官网页面 JS 进行修改
 * @author GDOU_Auth
 * @createDate 2022-09-06
 */
const CryptoJS = require('crypto-js')

var $aes_chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
var aes_chars_len = $aes_chars.length;
/** 随机混入字符串 */
function randomString(len) {
  var retStr = ''; for (i = 0; i < len; i++) {
    retStr += $aes_chars.charAt(Math.floor(Math.random() * aes_chars_len));
  }
  return retStr;
}

/** 核心 AES 处理函数 */
function getAesString(data, key0, iv0) {
  key0 = key0.replace(/(^\s+)|(\s+$)/g, "");
  var key = CryptoJS.enc.Utf8.parse(key0);
  var iv = CryptoJS.enc.Utf8.parse(iv0);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// AES 加密
function encryptAES(data, aesKey) {
  if (!aesKey) {
    return data;
  }
  var encrypted = getAesString(randomString(64) + data, aesKey, randomString(16));
  return encrypted;
}

/**
 * 密码加密，这里是入口函数
 * @param {string} pwd0 源密码明文
 * @param {string} key 密钥，网页嵌入，可以通过 `document.querySelector('#pwdEncryptSalt').value` 获取
 * @returns {string} 加密的密码
 * @example
 * encryptPassword('123456','ykDxTt6fCgEGH3cp')
 */
function encryptPassword(pwd0, key) {
  try {
    return encryptAES(pwd0, key);
  } catch (e) {

  }
  return pwd0;
}


module.exports = encryptPassword