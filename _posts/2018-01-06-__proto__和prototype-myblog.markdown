---
layout:     post
title:      "__proto__和prototype关系"
date:       2018-01-06 20:17:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文


[网页链接](https://www.zhihu.com/question/34183746/answer/58068402)


几乎任何对象有一个[[prototype]]属性，在标准中，这是一个隐藏属性。该属性指向的是这个对象的原型。那么一个对象的[[prototype]]属性究竟怎么决定呢？这是由构造该对象的方法决定的。据我所知有三种构造一个对象的方法：这个对象是通过对象字面量构造出来的。
```
var person1 = {
    name: 'cyl',
    sex: 'male'
};
```

形如这个形式的叫做对象字面量。这样子构造出的对象，其[[prototype]]指向Object.prototype这个对象是由构造函数构造出来的。
```
function Person(){}
var person1 = new Person();
```
通过new操作符调用的函数就是构造函数。由构造函数构造的对象，其[[prototype]]指向其构造函数的prototype属性指向的对象。每个函数都有一个prototype属性，其所指向的对象带有constructor属性，这一属性指向函数自身。（在本例中，person1的[[prototype]]指向Person.prototype）这个对象是由函数Object.create构造的。

```
var person1 = {
    name: 'cyl',
    sex: 'male'
};

var person2 = Object.create(person1);
```
本例中，对象person2的[[prototype]]指向对象person1。在没有Object.create函数的日子里，人们是这样做的：
```
Object.create = function(p) {
    function f(){}
    f.prototype = p;
    return new f();
}
```




然而虽然说[[prototype]]是一个隐藏属性，但很多浏览器都给每一个对象提供.__proto__这一属性，这个属性就是上文反复提到的该对象的[[prototype]]。由于这个属性不标准，因此一般不提倡使用。ES5中用Object.getPrototypeOf函数获得一个对象的[[prototype]]。ES6中，使用Object.setPrototypeOf可以直接修改一个对象的[[prototype]]


----------



`__proto__`（隐式原型）与prototype（显式原型）

### 显式原型 explicit prototype property：
每一个**函数**在创建之后都会拥有一个名为prototype的属性，**这个属性指向函数的原型对象**。

Note：通过Function.prototype.bind方法构造出来的函数是个例外，它没有prototype属性。

### 隐式原型 implicit prototype link：
JavaScript中任意**对象**都有一个内置属性[[prototype]]，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过`__proto__`来访问。ES5中有了对于这个内置属性标准的Get方法Object.getPrototypeOf().

Note: Object.prototype 这个对象是个例外，它的`__proto__`值为null 

### 二者的关系：
隐式原型指向**创建**这个对象的函数(constructor)的prototype

### 作用
显式原型的作用：用来实现基于原型的继承与属性的共享。


隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着__proto__依次查找。


###  __proto__的指向

__proto__的指向到底如何判断呢？
根据ECMA定义 'to the value of its constructor’s "prototype" '

----指向创建这个对象的函数的显式原型。
所以关键的点在于找到创建这个对象的构造函数，接下来就来看一下JS中对象被创建的方式，一眼看过去似乎有三种方式：
（1）对象字面量的方式 
（2）new 的方式
（3）ES5中的Object.create()


----------


Foo.prototype也是一个对象，对象就是由 Object() 这个构造函数创建的

```
function Foo(){}
var foo = new Foo()
Foo.prototype.__proto__ === Object.prototype //true 理由同上
```


----------

```
function Bar(){}
//这时我们想让Foo继承Bar
Foo.prototype = new Bar()
 Foo.prototype.__proto__ === Bar.prototype //true
```


----------

```
Object.__proto__ === Function.prototype
```


----------

### instanceof

instanceof 操作符的内部实现机制和隐式原型、显式原型有直接的关系。instanceof的左值一般是一个对象，右值一般是一个构造函数，用来判断左值是否是右值的实例。它的内部实现原理是这样的： 

```
//设 L instanceof R 
//通过判断
 L.__proto__.__proto__ ..... === R.prototype ？
//最终返回true or false
```
知道了这个也就知道为什么以下这些奇怪的表达式为什么会得到相应的值了

* Function instanceof Object  // true 
* Object instanceof Function  // true 
* Function instanceof Function  //true
* Object instanceof Object  // true
* Number instanceof Number  //false

## 总结
1. 对象有属性`__proto__`,指向该对象的构造函数的原型对象。
2. 方法除了有属性`__proto__`,还有属性prototype，prototype指向该方法的原型对象。

