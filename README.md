# GDOU_CAS_Login4NodeJS

广东海洋大学 CAS 认证 cookie 获取脚本

通过该脚本可以通过账号密码获取以下 cookie 和其有效信息：

| key              | 作用（不一定正确！只是跟其他人一起推断的） |
| ---------------- | ------------------------------------------ |
| route            | 重定向页面                                 |
| JSESSIONID       | 会话 ID，作用未知                          |
| CASTGC           | 未知                                       |
| MOD_AUTH_CAS     | 核心 cookie                                |
| EncryptKey       | 加密用密钥，目前暂不知道用处               |
| REFERERCE_TOKEN: | 未知                                       |

## 开始使用

### 克隆到本地
```
git clone https://github.com/QingXia-Ela/GDOU_CAS_Login4NodeJS.git
cd GDOU_CAS_Login4NodeJS
```

### 设置你的个人信息

到根目录下的 `config.json` 进行设置，文件里面看起来应该是这样的
```json
{
  "username": "",
  "password": ""
}
```

### 安装依赖并启动
```
npm i
npm run go
```

启动后就可以在控制台看见拿到的各个 cookie