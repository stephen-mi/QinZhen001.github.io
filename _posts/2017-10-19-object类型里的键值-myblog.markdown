---
layout:     post
title:      "object类型里的键值"
date:       2017-10-19 12:53:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.cnblogs.com/yuqingfamily/articles/5798928.html)

```
var obj = {"name1":"张三","name2":"李四"}; 
var key = "name1"; 
var value = obj.key;//得到了"undefined" 
value = obj.name1;//得到了"张三" 
```

其实我是想动态给key赋值，然后得到key为多少所对就的值。但这种做法行不通，obj.key会去找obj下key为"key"所对应的值，结果当然是找不到喽。 
于是，我想到了js中遍历对象属性的方法：

```
function printObject(obj){ 
//obj = {"cid":"C0","ctext":"区县"}; 
var temp = ""; 
for(var i in obj){//用javascript的for/in循环遍历对象的属性 
temp += i+":"+obj[i]+"\n"; 
} 
alert(temp);//结果：cid:C0 \n ctext:区县 
} 
```


----------

**怎么动态给key赋值，然后以obj.key的方式得到对应的value呢**


其实以上printObject中有提示，那就是用**obj[key]**的方法，key可以是动态的，这样就解决了我上面提出的问题了。 
最后说一下，还有一个方法也可以，那就是：**eval("obj."+key)**。

## 总结
js中想根据动态key得到某对象中相对应的value的方法有两个

 1. var key = "name1";var value = obj[key]; 
 2. var key = "name1";var value = eval("obj."+key);

```
var obj={"name":"tom","age":22,"job":"it"};
var keys="name";
console.log(obj[keys]);   //tom 
console.log(eval("obj."+keys));   //tom
```

