---
layout:     post
title:      "JS中call和apply和bind"
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

### bind方法

[https://www.cnblogs.com/xxxxBW/p/4914567.html](https://www.cnblogs.com/xxxxBW/p/4914567.html)

fun.bind(this,arg1,arg2,...)

bind()方法会创建一个新的函数，称为绑定函数,fun方法在this环境下调用

该方法可传入两个参数，第一个参数作为this，第二个及以后的参数则作为函数的参数调用

```javascript
this.a = 1;
var module = {
    a : 2,
    getA:function() {
    return this.a;    
    }
};
module.getA();//2

var getA1 = module.getA;
// getA在外部调用，此时的this指向了全局对象
getA1();//1

// 再把getA1方法绑定到module环境上
var getA2 = getA1.bind(module);
getA2();
```



**让函数拥有预设的参数**


**使用bind()方法使函数拥有预设的初始参数，这些参数会排在最前面，传给绑定函数的参数会跟在它们后面**



```javascript
function list(){
    // 让类数组arguments拥有数组的方法slice，这个函数实现了简单把类数组转换成数组
    return Array.prototype.slice.call(arguments);
}

list(1,2,3);//[1,2,3]

//给list绑定一个预设参数4 
var list1 = list.bind(undefined,4);

list1();//[4]

list1(1,2,3);//[4,1,2,3]
```

**在setTimeout中的使用**

正常情况下，调用setTimeout的时候this会指向全局对象，但是使用类的方法时我们需要指向类的实例，所以要把this，绑定要回调函数方便继续使用实例

```javascript
function Fun1() { 
  this.name = 1;
 }
Fun1.prototype.fun2 = function() {
  window.setTimeout(this.fun3.bind(this), 1000);
 }
Fun1.prototype.fun3 = function(){
    console.log('name:'+this.name);//name:1
}
var fun = new Fun1();
fun.fun2();
```




## 补充


### 重写bind()

```javascript
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






### Function.apply.bind()


先撇开Promise不谈，直接来看Function.apply.bind(…)：

```javascript
var sum = function(x, y) {
   console.log(x, y);
}
var foo = Function.apply.bind(sum, null);
foo([10, 20]);   // 10, 20
```


这里我们有一个函数sum，通过Function.apply.bind(sum, null)我们创建了一个新的函数foo(…)。


我们一步步分析Function.apply.bind(sum, null)这段代码。


sum.apply(null, [10, 20])这句代码将第一个参数置为null，第二个参数是一个数组，用于拆开后作为sum的最终参数。 

熟悉sum.apply(…)方法的朋友一定知道，如果将sum.apply(…)的第一个参数设置为null，那么就意味着我们并不关心sum在执行时其内部的this指向谁。而Function.apply.bind(sum, null)目的就是将sum.apply(…)的第一个参数固定为null。**其中，Function.apply.bind(sum, null)等价于sum.apply.bind(sum, null)**。

所以最终我们得到的foo函数就是sum.apply(null, [10, 20]); [10,20]会拆开成10和20传递给sum(…)。

那么我们再回到最开始的那个Promise的例子，传递给.then()的Promise决议值就是数组[10,20]，.then函数的第一个参数(通常我们称之为fulfilled(…)函数)就相当于我们刚才创建的foo(…)，执行foo([10, 20])输出结果就是10,20。


```javascript
 Function.apply.bind((x, y) => {
            console.log(x, y) 
    }, null)
    相当于
    var applyCopy=Function.apply;
    var foo=function(a,b){
        console.log(a,b)
    };
    apply.bind(foo,null);
    //bind指定this的指向，这里的bind指向foo函数，以函数为this调用函数，就是
    foo.applyCall(null)
```


### Function.bind.apply() 

我第一次见到这样的代码是在《你不知道的JS》中卷的2.4小节。讲回调的时候。针对回调的调用过早的问题，有经验的开发者们给出了这样的解决方式（当然ES6之后解决回调函数调用过早的问题还是倾向于借助Promise机制）：

```javascript
function asyncify(fn) {
    var orig_fn = fn,
        intv = setTimeout( function(){
            intv = null;
            if (fn) fn();
        }, 0 )
    ;

    fn = null;

    return function() {
        // 触发太快，在定时器intv触发指示异步转换发生之前？
        if (intv) {
            fn = orig_fn.bind.apply(
                orig_fn,
                // 将包装函数的`this`加入`bind(..)`调用的
                // 参数，同时currying其他所有的传入参数
                [this].concat( [].slice.call( arguments ) )
            );
        }
        // 说明没有过早触发，这里已经是异步
        else {
            // 调用原来的函数
            orig_fn.apply( this, arguments );
        }
    };
}
```






和前面类似，我们将orig_fn.bind.apply(orig_fn, args)拆成两部分来看：函数orig_fn.bind(…)和.apply(orig_fn, args)。根据.apply(…)的定义，orig_fn.bind.apply(orig_fn, args)其实就意味着我们将orig_fn.bind(…)函数的this指向orig_fn，然后.apply(orig_fn, args)的第二个参数会将剩下的参数传递给orig_fn.bind(…)函数。

那么我们现在分析一下剩下的参数（[this].concat( [].slice.call( arguments )）都是什么吧，首先arguments是外界传入的其余参数(return function(…)这个函数传入的参数)，接下来我们借助[].slice.call( arguments )将其转化为一个参数数组，备用。由于.bind(…)的第一个参数为在 origin_fn 调用中用到的 this (我们在前一段就已经提到过，这个this其实就指向orig_fn)，所以使用 [this] 将构造的参数数组中的第一个参数设置为 this 。[this]再与我们前面的备用数组拼接起来，一同传递给.bind(…)。

此时，.bind(…)的第一个参数就是this，剩余参数就是外界传入的参数。所以，除了传递给orig_fn.bind(…)的第一个参数this，其余的参数都会作为柯里化参数（预设值）。



>在这里的关键点是：.bind(…) 函数是通过 .apply(…) 调用的，所以 .bind(…) 自身所需要的 this 对象是一个函数（函数也是对象，在这里即 origin_fn）。



