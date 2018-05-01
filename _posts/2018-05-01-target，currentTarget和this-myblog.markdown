---
layout:     post
title:      "target，currentTarget和this"
date:       2018-05-01 23:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/wkyseo/article/details/51863483)

**target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段**


只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象(注册该事件的对象)（一般为父级）。**this指向永远和currentTarget指向一致（只考虑this的普通函数调用）**。

```
 <div id="outer" style="background:#099">  
     click outer  
     <p id="inner" style="background:#9C0">click inner</p>  
     <br>  
 </div>  

    <script type="text/javascript">  
    function G(id){  
        return document.getElementById(id);      
    }  
    function addEvent(obj, ev, handler){  
        if(window.attachEvent){  
            obj.attachEvent("on" + ev, handler);  
        }else if(window.addEventListener){   
            obj.addEventListener(ev, handler, false);  
        }  
    }  
    function test(e){  
        alert("e.target.tagName : " + e.target.tagName + "\n e.currentTarget.tagName : " + e.currentTarget.tagName);  
    }  
    var outer = G("outer");  
    var inner = G("inner");  
    //addEvent(inner, "click", test);  
    addEvent(outer, "click", test);  
    </script>
 ```
 
 
 
 
当点击inner对象的时候，先触发inner绑定的事件，再触发outer绑定的事件，（因为outer是在事件冒泡阶段绑定的，如果outer是在捕获阶段绑定的，就会先触发out的事件程序，即便inner事件也绑定在捕获阶段。因为捕获流从根部元素开始）。 


**事件流：捕获（自顶而下）——目标阶段——冒泡（自下而顶）**

在事件处理程序内部，对象this始终等于currentTarget的值(换个角度理解，DOM上的方法this指向都为该DOM-方法调用模式)，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则this、currentTarget和target包含相同的值。
 
 
 
 
 
 
 
 
 
 
 
 
## 补充
HTML DOM addEventListener() 方法
 
第三个参数：useCapture	可选。布尔值，指定事件是否在捕获或冒泡阶段执行。

可能值:
* true - 事件句柄在捕获阶段执行
* false- false- 默认。事件句柄在冒泡阶段执行 
 
 
 
 
