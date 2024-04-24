# clipboard-test

剪切板 [`navigator.clipboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) API的使用demo, 用于检测window, 鸿蒙webView, 跨系统的支持检测.

## 一. 安装工程依赖

```bash
npm i
```

操作剪切板需要 [new ClipboardItem()](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) 实例,而ClipboardItem必须在 `https` 环境,所以需要本地跑https服务

## 二. 安装本地自签名证书

### 2.1 install mkcert
```bash
npm i mkcert -g
```

### 2.2 生成ca证书

```bash
cd [project folder]

mkdir keys

cd keys
mkcert create-ca --organization KooMinder --country-code CN
```
> 上面的 `options` 参见 [mkcert](https://github.com/liuweiGL/vite-plugin-mkcert/blob/HEAD/README-zh_CN.md) 的npm文档

### 2.3 再根据ca证书生成cert证书

```bash
# mkcert create-cert [options] # options 参见npm文档

# 如下，设置domains 注意后面一串改为自己的ip
mkcert create-cert --organization KooMinder --domains 192.168.110.13
```

### 2.3 安装证书

- 双击 `ca.crt` ，在弹出对话框中点击“安装证书”

修改vite.config.ts

```javascript
const fs = require('node:fs')

devServer: {
  https: {
    cert: fs.readFileSync(path.join(__dirname, 'keys/cert.crt')),
    key: fs.readFileSync(path.join(__dirname, 'keys/cert.key'))
  }
}
```

## 三. 启动本地服务
```bash
npm run dev
```


## 四. 参考文档

- [CodePen 代码地址](https://codepen.io/groupofstar/pen/NWmoRZL)
- [vite集成https，并安装本地自签名证书 - 同时解决msw fallback mode问题](https://zhuanlan.zhihu.com/p/551720193)