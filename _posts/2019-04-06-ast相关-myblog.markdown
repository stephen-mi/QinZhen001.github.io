---
layout:     post
title:      "AST相关"
date:       2019-04-06 23:06:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - AST
---

> “Yeah It's on. ”


## 正文

[https://segmentfault.com/a/1190000016231512](https://segmentfault.com/a/1190000016231512)


通过抽象语法树解析，我们可以像童年时拆解玩具一样，透视Javascript这台机器的运转，并且重新按着你的意愿来组装。


```javascript
function add(a, b) {
    return a + b
}
```

首先，我们拿到的这个语法块，是一个FunctionDeclaration(函数定义)对象。



用力拆开，它成了三块：

* 一个id，就是它的名字，即add
* 两个params，就是它的参数，即[a, b]
* 一块body，也就是大括号内的一堆东西

add没办法继续拆下去了，它是一个最基础Identifier（标志）对象，用来作为函数的唯一标志，就像人的姓名一样。

```
{
    name: 'add'
    type: 'identifier'
    ...
}
```


params继续拆下去，其实是两个Identifier组成的数组。之后也没办法拆下去了。

```javascript
[
    {
        name: 'a'
        type: 'identifier'
        ...
    },
    {
        name: 'b'
        type: 'identifier'
        ...
    }
]
```




### estree


js社区有一种非官法的语法表达标准：estree，是一种json风格的AST，现在流行的bable，eslint的实现也是基于estree。



estree是一个相对简单的静态语法描述，除了在源代码分析，转换方面有很大用处外，也可以用于语言的学习。把estree作为一个规范的快速索引，如果遇到有疑惑的地方，通过这个索引快速定位到规范的官方说明。规范里面，包含语法的静态和动态描述。


estree(es5)简要的结构如下

```javascript
Node objects
Identifier
Literal
RegExpLiteral
Programs
Functions
Statements
   Expression/Block/Empty/Debugger/With/Control/Choice/Exceptions/Loops
Declarations
    Function/Variable
Expressions
    This/Array/Object/Property/Function/Unary/Binary/AssignmentLogical/
    Logical/Member/Conditional/Call/New/Sequence
Patterns
```

JS整体语法整体分为三级别：programe：stament：expresstion;



### acorn


acorn是一个符合estree规范的高性能的的js解析器，输出的ast符合estree规范。acron也被大量我们熟悉的工具采用。





















