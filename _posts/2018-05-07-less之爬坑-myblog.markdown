---
layout:     post
title:      "less之爬坑"
date:       2018-05-07 13:14:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Less
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.imooc.com/wenda/detail/348038?block_id=tuijian_yw)


### 路径问题
Vue组件引入less文件，图片路径出现问题


less文件的mixin.less文件
```
.bg-image(@url) {
  background-image: url("@{url}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    background-image: url("@{url}@3x.png");
  }
}
```


header组件的vue文件导入mixin.less
header.vue使用.bg-images(@url)

出现问题
**.bg-image('brand')编译出来的图片的路径是less目录下**


#### 最终解决
```
.bg-image(@url){
 background-image:~"url(@{url}@2x.png)";
 @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
   background-image:~"url(@{url}@3x.png)";
 }
}
```


#### LESS中关于‘~’符号的小问题
在.less文件中写：
```
.test_03{  
    width:calc(300px-30px);  
} 
```
将在相应的.css中得到如下效果：
```
    .test_03 {  
      width: calc(270px);  
    }  
```
也就是说此时的300px-30px已由编译软件计算得出。



而在.less文件中写（加上~）：
```
    .test_03{  
        width:~'calc(300px-30px)';  
    }  
```
在相应的.css中会得到：
```
    .test_03 {  
      width: calc(300px-30px);  
    }  
```
也就是说让浏览器去计算300px-30px。




### @import引入路径中使用波浪号~
```
@import "~common/stylus/variable"
```

这个应该是webpack的路径解析相关的用法。
~这里应该是**指定的模块解析目录下进行匹配对应文件**，
webpack中可以通过resolve.modules字段修改模块目录。


在webpack.base.config.js下
```
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'api': resolve('src/api'),
      'base': resolve('src/base')
    }
  }
```


[https://www.npmjs.com/package/less-loader](https://www.npmjs.com/package/less-loader)


>@import引入路径中使用波浪号~，stylus和less效果一致




### 循环
```
// less官方文档给的循环实例，其实实际上这就是递归调用
.loop(@counter) when (@counter > 0) {
    width: (10px + @counter);
    .loop((@counter - 1));
}
```







