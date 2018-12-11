---
layout:     post
title:      "npm相关命令"
date:       2018-11-16 20:19:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - npm
---

> “Yeah It's on. ”


## 正文

[https://www.cnblogs.com/penghuwan/p/6973702.html#_label4](https://www.cnblogs.com/penghuwan/p/6973702.html#_label4)

### 撤销已经发布的包

npm unpublish 包名 --force

### npm link
[https://docs.npmjs.com/cli/link](https://docs.npmjs.com/cli/link)

First, npm link in a package folder will create a symlink in the global folder `{prefix}/lib/node_modules/<package>`  that links to the package where the npm link command was executed. 



这个命令的作用就是在全局环境下，生成一个符号链接文件，该文件的名字就是package.json文件中指定的模块名。同时我们对此模块的修改会实时反馈在全局目录下。

