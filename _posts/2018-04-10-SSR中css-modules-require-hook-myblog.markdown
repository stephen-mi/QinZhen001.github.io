---
layout:     post
title:      "css-modules-require-hook"
date:       2018-04-10 22:37:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - SSR
---

> “Yeah It's on. ”


## 正文
[css-modules-require-hook](https://www.npmjs.com/package/css-modules-require-hook)

[react中SSR](https://www.jianshu.com/p/47c8e364d0bc?appinstall=1&mType=Group)


解决后端不支持CSS的问题


The require hook compiles CSS Modules in runtime. This is similar to Babel's babel/register.

[See the example](https://github.com/css-modules/css-modules-require-hook/tree/a432b76e1eb46a7bf9ef729c16a96b6ef2295410/demo)


The second one allows you to move options to the separate file cmrh.conf.js. Config file should be located in the same directory where executor is or in its ancestor directories. In that case hook will be attached right after the css-modules-require-hook/preset module will be required. Example:
```
// cmrh.conf.js
module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
};

require('css-modules-require-hook/preset');
 
// const styles = require('./icon.css');
```

### Using with babel-node / ES6 Imports

You will need to create a cmrh.conf.js file within the directory as you are importing css-modules-require-hook.
```
// server.js
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import routes from '/shared/views/routes'
 
// create server, etc

// cmrh.conf.js
module.exports = {
  // Same scope name as in webpack build
  generateScopedName: '[name]__[local]___[hash:base64:5]',
}
```



**需要注意的此处有一小坑，csshook必须放所有组件引入之前**

```
// 处理css
import csshook from 'css-modules-require-hook/preset';

const express = require("express"); const bodyParser = require("body-parser"); const cookieParser = require("cookie-parser"); const userRoute = require("./userRoute"); const app = express(); const path = require('path'); app.use(cookieParser()); app.use(bodyParser.json());
```

作者：抱紧我_8204
链接：https://www.jianshu.com/p/47c8e364d0bc
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



