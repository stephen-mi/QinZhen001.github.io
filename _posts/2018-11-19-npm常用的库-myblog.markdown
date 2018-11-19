---
layout:     post
title:      "npm常用的库"
date:       2018-11-19 19:52:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - npm
---

> “Yeah It's on. ”


## 正文


### chalk 
[http://www.8dou5che.com/2017/10/29/chalk/](http://www.8dou5che.com/2017/10/29/chalk

控制台字符样式。

#### 使用
```javascript
const chalk = require('chalk');  
console.log(chalk.blue('Hello world!'));  
```


### commander
[https://blog.csdn.net/qq_40129176/article/details/80816853](https://blog.csdn.net/qq_40129176/article/details/80816853)

用来自行开发出这样一个命令行工具

#### 安装
```javascript
npm install commander --save
```

#### 使用
```javascript
// 引入依赖
var program = require('commander');
 
// 定义版本和参数选项
program
  .version('0.1.0', '-v, --version')
  .option('-i, --init', 'init something')
  .option('-g, --generate', 'generate something')
  .option('-r, --remove', 'remove something');
 
// 必须在.parse()之前，因为node的emit()是即时的
program.on('--help', function(){
 console.log('  Examples:');
  console.log('');
  console.log('    this is an example');
  console.log('');
});
 
program.parse(process.argv);
 
if(program.init) {
  console.log('init something')
}
 
if(program.generate) {
  console.log('generate something')
}
 
if(program.remove) {
  console.log('remove something')
}

```



#### api

**version**

作用：定义命令程序的版本号
用法示例：.version('0.0.1', '-v, --version')


参数解析：
1. 版本号<必须>
2. 自定义标志<可省略>：默认为 -V 和 --version


----------


**option**

作用：用于定义命令选项


用法示例：.option('-n, --name<path>', 'name description', 'default name')

参数解析：
1. 自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 <> 包含，后者用 [] 包含
2. 选项描述<省略不报错>：在使用 --help 命令时显示标志描述
3.  默认值<可省略>

----------


**command**

作用：添加命令名称

用法示例：.command('rmdir <dir> [otherDirs...]', 'install description', opts)


参数解析：
1.  命令名称<必须>：命令后面可跟用 <> 或 [] 包含的参数；命令的最后一个参数可以是可变的，像实例中那样在数组后面加入 ... 标志；在命令后面传入的参数会被传入到 action 的回调函数以及 program.args 数组中
2. 命令描述<可省略>：如果存在，且没有显示调用action(fn)，就会启动子命令程序，否则会报错
3. 配置选项<可省略>：可配置noHelp、isDefault等


----------


**description**

作用：定义命令的描述


用法示例：.description('rmdir desc')


----------



**action**


作用：定义命令的回调函数


用法示例：.action(fn)


----------

**parse**


作用：用于解析process.argv，设置options以及触发commands

用法示例：.parse(process.argv)


----------



