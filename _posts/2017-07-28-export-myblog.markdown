---
layout:     post
title:      "export default和export"
date:       2017-07-28 11:05:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ES6
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.jianshu.com/p/edaf43e9384f)

<strong>export default 和 export 的主要区别 在于对应的import的区别：
* export 对应的 import 需要知道 export抛出的变量名或函数名 import{a,b}
* export default对应的 import 不需要知道 export抛出的变量名或函数名 import anyname
</strong>

1. export与exportdefault均可用于导出常量、函数、文件、模块等
2. 你可以在其它文件或模块中通过`import+(常量 | 函数 |文件 | 模块)`名的方式，将其导入，以便能够对其进行使用
3. 在一个文件或模块中，export、import可以有多个，export default仅有一个
4. 通过export方式导出，在导入时要加{ }，export default则不需要


1.export
//demo1.js
export const str = 'hello world'
export function f(a){ return a+1}
对应的导入方式：

//demo2.js
import { str, f } from 'demo1' //也可以分开写两次，导入的时候带花括号

2.export default
//demo1.js
export default const str = 'hello world'
对应的导入方式：

//demo2.js
import str from 'demo1' //导入的时候没有花括号


----------


//a.js
let sex = "boy";
export default sex（sex不能加大括号）
//原本直接export sex外部是无法识别的，加上default就可以了.但是一个文件内最多只能有一个export default。
其实此处相当于为sex变量值"boy"起了一个系统默认的变量名default，自然default只能有一个值，所以一个文件内不能有多个export default。


// b.js
本质上，a.js文件的export default输出一个叫做default的变量，然后系统允许你为它取任意名字。所以可以为import的模块起任何变量名，且不需要用大括号包含
import any from "./a.js"
import any12 from "./a.js" 
console.log(any,any12)   // boy,boy


----------


作者：谢一咕
链接：http://www.jianshu.com/p/edaf43e9384f
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 后记


