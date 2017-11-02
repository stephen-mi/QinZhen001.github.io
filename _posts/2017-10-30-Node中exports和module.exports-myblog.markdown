---
layout:     post
title:      "Node中exports和module.exports"
date:       2017-10-30 20:31:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Node
---

> “Yeah It's on. ”


## 正文
 
[网页链接](https://www.ycjcl.cc/2017/02/10/module-exportshe-exportsde-qu-bie/)


### Module.exports
module.exports对象是由模块系统创建的。
有时这是难以接受的；许多人希望他们的模块成为某个类的实例。 为了实现这个，需要将期望导出的对象赋值给module.exports。 注意，将期望的对象赋值给exports会简单地重新绑定到本地exports变量上，这可能不是你想要的。

### exports
exports变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋于 module.exports 的值。它有一个快捷方式，以便 module.exports.f = ... 可以被更简洁地写成exports.f = ...。 注意，就像任何变量，如果一个新的值被赋值给exports，它就不再绑定到module.exports(其实是exports.属性会自动挂载到没有命名冲突的module.exports.属性)

### require

从require导入方式去理解，关键有两个变量(全局变量module.exports，局部变量exports)、一个返回值(module.exports)


```
console.log(exports); // {}  
console.log(module.exports);  // {}  
console.log(exports === module.exports);    // true  
console.log(exports == module.exports);        // true  
/**
 Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/1.js',
  loaded: false,
  children: [],
  paths:
   [ 
     '/node_modules' ] 
 }
 */
console.log(module);
```

1. 每个js文件一创建，都有一个var exports = module.exports = {};，使exports和module.exports都指向一个空对象。
2. module是全局内置对象，exports是被var创建的局部对象。
3. module.exports和exports所指向的内存地址相同


----------


```
// 2.js
exports.id = 'exports的id';  
exports.id2 = 'exports的id2';  
exports.func = function(){  
    console.log('exports的函数');
};
exports.func2 = function() {  
    console.log('exports的函数2');
};
module.exports = {  
    id: 'module.exports的id',
    func:function(){
        console.log('module.exports的函数');
    }

};
```

```
// 3.js
var a = require('./2.js');  
// 当属性和函数在module.exports都有定义时：
console.log(a.id);  // module.exports的id  
console.log(a.func()); // module.exports的函数

// 当属性在module.exports没有定义，函数在module.exports有定义
console.log(a.id2);  // undefined  
console.log(a.func());  // module.exports的函数

// 当函数在module.exports没有定义，属性在module.exports有定义
console.log(a.id);        // module.exports的id  
console.log(a.func2());    // 报错了 TypeError: a.func2 is not a function  
```

1. module.exports像是exports的大哥，当module.exports以{}整体导出时会覆盖exports的属性和方法，
2. 注意，若只是将属性/方法挂载在module.exports./exports.上时，exports.id=1和module.exports.id=100，module.exports.id=function(){}和exports.id=function(){}，最后id的值取决于exports.id和module.exports.id的顺序，谁在后，就是最后的值
3. 若exports和module.exports同时赋值时，exports所使用的属性和方法必须出现在module.exports，若属性没有在module.exports中定义的话，出现undefined，若方法没有在module.exports中定义，会抛出TypeError错误。


----------
```
// 4.js
var a = require('./5.js');  
// 若传的是类，new一个对象
var person = new a('Kylin',20);  
console.log(person.speak()); // my name is Kylin ,my age is 20

// 若不需要在构造函数时初始化参数，直接调用方法/属性
// a.speak();  // my name is kylin ,my age is 20
```

```
// 5.js
// Person类
function Person(name,age){  
    this.name = name;
    this.age = age;
}
// 为类添加方法
Person.prototype.speak = function(){  
    console.log('my name is '+this.name+' ,my age is '+this.age);
};

// 返回类
module.exports = Person;

// 若构造函数没有传入参数(name,age)，直接传入对象
// module.exports = new Person('kylin',20);
```

说了这么多，其实建议就是，如果只是单一属性或方法的话，就使用exports.属性/方法。要是导出多个属性或方法或使用对象构造方法，结合prototype等，就建议使用module.exports = {}