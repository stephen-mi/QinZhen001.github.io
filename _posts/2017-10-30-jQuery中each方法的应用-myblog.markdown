---
layout:     post
title:      "Jquery中each方法的应用"
date:       2017-10-30 15:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.imooc.com/code/10181)

jQuery中有个很重要的核心方法each，大部分jQuery方法在内部都会调用each，其主要的原因的就是jQuery的实例是一个元素合集

如下：找到所有的div，并且都设置样式，css只是一个方法，所以内部会调用each处理这个div的合集，给每个div都设置style属性

>$('div').css(...)

jQuery的大部分方法都是针元素合集的操作，所以jQuery会提供$(selector).each()来遍历jQuery对象
.each只是处理jQuery对象的方法，jQuery还提供了一个通用的jQuery.each方法，用来处理对象和数组的遍历

### 语法
jQuery.each(array, callback )
jQuery.each( object, callback )

第一个参数传递的就是一个对象或者数组，第二个是回调函数
```
$.each(["Aaron", "慕课网"], function(index, value) {
   //index是索引,也就是数组的索引
   //value就是数组中的值了
});
```

each就是for循环方法的一个包装，内部就是通过for遍历数组与对象，通过回调函数返回内部迭代的一些参数，第一个参数是当前迭代成员在对象或数组中的索引值(从0开始计数)，第二个参数是当前迭代成员(与this的引用相同
jQuery.each()函数还会根据每次调用函数callback的返回值来决定后续动作。如果返回值为false，则停止循环(相当于普通循环中的break)；如果返回其他任何值，均表示继续执行下一个循环。

```
$.each(["Aaron", "慕课网"], function(index, value) {
    return false; //停止迭代
});
```

### 例子
```
  $("#exec").click(function() {
        var v = $("#animation").val();
        var $aaron = $("#aaron");
        $aaron.empty();
        if (v == "1") {

            // 遍历数组元素
            $.each(['Aaron', '慕课网'], function(i, item) {
                $aaron.append("索引=" + i + "; 元素=" + item);
            });
        } else if (v == "2") {
            // 遍历对象属性
            $.each({
                name: "张三",
                age: 18
            }, function(property, value) {
                $aaron.append("属性名=" + property + "; 属性值=" + value);
            });
        } 
    });
```

