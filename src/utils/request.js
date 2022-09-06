const { default: axios } = require('axios')
const qs = require('querystring')

axios.defaults.timeout = 10000;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 默认 xhr
axios.defaults.transformRequest = (data) => qs.stringify(data) //qs是第三方库，转换为x-www-form-urlencoded
axios.defaults.maxRedirects = 1000
axios.defaults.withCredentials = true

module.exports = axios;
