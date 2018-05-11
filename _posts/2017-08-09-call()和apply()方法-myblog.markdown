---
layout:     post
title:      "JS中的call()和apply()方法"
date:       2017-08-09 11:37:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://uule.iteye.com/blog/1158829)

### call方法: 
定义：调用一个对象的一个方法，以另一个对象替换当前对象。 
说明： 
call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 
如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。 

### apply方法： 
定义：应用某一对象的一个方法，用另一个对象替换当前对象。 
说明： 
如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。 
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。
```
function add(a,b)  
{  
    alert(a+b);  
}  
function sub(a,b)  
{  
    alert(a-b);  
}  
```  
add.call(sub,3,1);   
这个例子中的意思就是用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4); // 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。
```
function Animal(){    
    this.name = "Animal";    
    this.showName = function(){    
        alert(this.name);    
    }    
}    
  
function Cat(){    
    this.name = "Cat";    
}    
   
var animal = new Animal();    
var cat = new Cat();    
```   
//通过call或apply方法，将原本属于Animal对象的showName()方法交给对象cat来使用了。    
//输入结果为"Cat"    
animal.showName.call(cat,",");    
//animal.showName.apply(cat,[]);  
 call 的意思是把 animal 的方法放到cat上执行，原来cat是没有showName() 方法，现在是把animal 的showName()方法放到 cat上来执行，所以this.name 应该是 Cat


* 相同点:两个方法产生的作用是完全一样的
* 不同点:方法传递的参数不同

a.call(b,arg1,arg2…)
apply(b,[arg1,arg2])

//apply只有2个参数，它将call的参数（arg1,arg2…）放在一个数组中作为apply的第二参数






## 补充


### 重写bind()

```
 Function.prototype.bind = function () {
        var self = this,
            context = [].shift.call(arguments),
            args = [].slice.call(arguments)

        return function () {
//            arguments是个类数组 所以没法直接用arguments
//            console.log(arguments)
//            console.log([].slice.call(arguments))
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)))
        }

    }


    var obj = {
        name: 'sebe'
    }

    var func = function (a, b, c, d) {
        alert(this.name)
        alert([a, b, c, d])
    }.bind(obj, 1, 2)


    func(3, 4)
```

>想把arguments转成正的数的时候，可以借用 Array.prototype.slice 方法















