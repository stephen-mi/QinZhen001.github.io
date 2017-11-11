---
layout:     post
title:      "监听滚轮滑动事件"
date:       2017-11-11 16:25:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
 
 
### 在Vue中 
**我们使用@mousewheel.native,但是不兼容火狐浏览器**


>切记native


----------

```
   <slider ref="slider" :pages="mypages" :sliderinit="slider" @mousewheel.native="mouseScroll">
 </slider>
 ```

```
      mouseScroll(e){
        console.log(e.wheelDelta)
        if (e.wheelDelta < 0) {
          //向下
          this.$refs.slider.$emit('slideNext')
        } else {
          //向上
          this.$refs.slider.$emit('slidePre')
        }
      }
```      

### 普通情况

**注意:** onmousewheel不兼容火狐浏览器,只能监听"DOMMouseScroll"

```
function addMouseWheelEvent(element,func) {
 
   if (typeof element.onmousewheel == "object") {
      element.onmousewheel = function() {
        func();
     };
   }

   if (typeof element.onmousewheel == "undefined") {
      element.addEventListener("DOMMouseScroll",func,false);
   } 
 }
```
方法的名称是addMouseWheelEvent，该方法接收两个参数：element表示要添加mousewheel事件的元素节点，func表示作为事件处理程序的函数。使用方法是直接调用该函数并出入适当的参数即可：addMouseWheelEvent(element,func);

原理是：在支持onmousewheel的浏览器中element.onmousewheel的typeof值为object，在不支持onmousewheel的浏览器中element.onmousewheel的typeof值为undefined。可以根据typeof值的不同对浏览器进行能力检测，从而应用不同的添加事件处理程序的方法。

经过测试该方法在chrome、IE11和FireFox中能正常使用。

### 补充

在给元素指定mousewheel事件时，对应的event对象会有一个wheelDelta属性（规范中的属性），当用户向前滚动滚轮时，其值是120的整数倍，当用户向后滚动滚轮时，其值是-120的整数倍。当然在FireFox中这个属性不叫wheelDelta，而是叫detail，当用户向前滚动滚轮时，detail的值是-3的整数倍，当用户向后滚动滚轮时，detail的值是3的整数倍，正负号与wheelDelta的值是相反的。