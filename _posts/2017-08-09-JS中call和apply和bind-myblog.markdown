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



```javascript
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


```javascript
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


[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

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


### 快捷调用


在你想要为一个需要特定的 this 值的函数创建一个捷径（shortcut）的时候，bind() 也很好用。



你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以简单地这样写：

```javascript
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```



用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 apply() 方法的绑定函数，并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。



```javascript
// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
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

**终于看懂了。。。。**

关键点在于 bind可以预设参数

也是就是说bind的第二个参数null，为apply的第一个参数


apply(null,...args) 那么就意味着我们并不关心执行时其内部的this指向谁


-------------


[https://blog.csdn.net/weixin_37787381/article/details/81509361](https://blog.csdn.net/weixin_37787381/article/details/81509361)


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






### new操作符和bind或apply同时使用
[https://github.com/bramblex/jsjs](https://github.com/bramblex/jsjs)


发现：在写js解析器操作ast时发现些神奇的代码

```javascript
    NewExpression: (node: ESTree.NewExpression, scope: Scope) => {
        const func = evaluate(node.callee, scope)
        const args = node.arguments.map(arg => evaluate(arg, scope))
        return new (func.bind.apply(func, [null].concat(args)))
    },
```


bind.apply和new结合，引起了我的兴趣，所以就搜索资料进行了学习

---

[https://www.cnblogs.com/pspgbhu/p/6796795.html](https://www.cnblogs.com/pspgbhu/p/6796795.html)

Fn.bind.apply()解决new操作符不能用与apply或call同时使用

小明想要用数组的形式为 Cls.func 传入多个参数，他想到了以下的写法：

```javascript
var a = new Cls.func.apply(null, [1, 2, 3]);
```

然而浏览器却报错 Cls.func.apply is not a constructor。
乍一看是 new 操作符去修饰 Cls.func.apply 了，于是他又这么写：

```javascript
var a = (new Cls.func).apply(null, [1, 2, 3]);
```


浏览器依旧报错。。。好吧，还是好好查一查相关的解决方法吧，还好这是个好时代，没有什么是网上查不出来的。


解决方案:

[https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible](https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible)



```javascript
function newCall(Fn) {
    return new (Function.prototype.bind.apply(Fn, arguments));
    // or even
    // return new (Fn.bind.apply(Fn, arguments));
    // if you know that Fn.bind has not been overwritten
}

// It can be used as follows:
var s = newCall(Fn, a, b, c);

// or even directly:
var a = new (Function.prototype.bind.call(Fn, null, 1, 2, 3));

var a = new (Function.prototype.bind.apply(Fn, [null, 1, 2, 3]));
```


以上关键就在于 .bind.apply() 或 .bind.call() 这中写法。

Function.prototype.bind() 等同于 Fn.bind() 会创建一个新的函数，第一个参数为新函数的 this 指向，而后多个参数为绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。


先分析一下 Function.prototype.bind.call() 这种写法：

var a = new (Function.prototype.bind.call(Fn, null, 1, 2, 3));
call() 接受多个参数，第一个参数为函数执行的上下文环境，后面的参数会依次传递给前面的 bind 作为参数。

所以 bind() 接到的参数为 bind(null, 1, 2, 3)。所以上面的那种写法就等同于：
```javascript
var a = new ( Fn.bind(null, 1, 2, 3)() );
```
同理再推导 Function.prototype.bind.apply() 写法：
```javascript
var a = new (Function.prototype.bind.apply(Fn, [null, 1, 2, 3]);
```
call() 接受两个参数，第一个参数为函数执行的上下文环境，第二个参数为数组，数组的每一项会一次作为 bind() 的参数，因此 bind() 接受到的参数也为 bind(null, 1, 2, 3)。因此也等价于：
```javascript
var a = new ( Fn.bind(null, 1, 2, 3)() );
```


**有了上面的推导，我们可以抽象出一个通用方法**


```javascript
function newApply(Fn, argsAry) {
    argsAry.unshift(null);
    return new (Fn.bind.apply(Fn, argsAry));
}

// 调用
newApply(Cls.func, [1, 2, 3]) // well done !!
```










