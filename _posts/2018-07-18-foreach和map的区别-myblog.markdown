---
layout:     post
title:      "foreach和map的区别"
date:       2018-07-18 14:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/q/1010000013170900?utm_source=index-hottest)


map方法体现的是数据不可变的思想。该思想认为所有的数据都是不能改变的，只能通过生成新的数据来达到修改的目的，因此直接对数组元素或对象属性进行操作的行为都是不可取的。这种思想其实有很多好处，最直接的就是避免了数据的隐式修改。immutable.js是实现数据不可变的一个库，可通过专属的API对引用类型进行操作，每次形成一个新的对象。


forEach和map还存在一个编程思想的区别，前者是命令式编程，后者是声明式编程，如果项目的风格是声明式的，比如React，那么后者显然更统一。


共同点：
1. 都是循环遍历数组中的每一项。
2. forEach()和map()里面每一次执行匿名函数都支持3个参数：数组中的当前项item,当前项的索引index,原始数组input。
3. 匿名函数中的this都是指Window。
4. 只能遍历数组。





### forEach()

没有返回值
```javascript
arr[].forEach(function(value,index,array){

　　//do something

})
```

理论上这个方法是没有返回值的**，仅仅是遍历数组中的每一项，不对原来数组进行修改；但是可以自己通过数组的索引来修改原来的数组**

```javascript
var ary = [12,23,24,42,1];  
var res = ary.forEach(function (item,index,input) {  
       input[index] = item*10;  
})  
console.log(res);//--> undefined;  
console.log(ary);//--> 通过数组索引改变了原数组；  
```



### map()

有返回值，可以return 出来。


```javascript
arr[].map(function(value,index,array){

　　//do something

　　return XXX

})
```
参数：value数组中的当前项,index当前项的索引,array原始数组；



>区别：map的回调函数中支持return返回值；return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）；

```javascript
var ary = [12,23,24,42,1];  
var res = ary.map(function (item,index,input) {  
    return item*10;  
})  
console.log(res);//-->[120,230,240,420,10];  原数组拷贝了一份，并进行了修改
console.log(ary);//-->[12,23,24,42,1]；  原数组并未发生变化
```

























