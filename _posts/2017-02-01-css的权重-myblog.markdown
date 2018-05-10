---
layout:     post
title:      "Css中的权重"
date:       2018-02-01 15:55:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/wolfwows/p/5928856.html)

讨论CSS的权重，则必须想了解而且是深刻的了解CSS样式的6种基础选择器：**ID选择器、类选择器、属性选择器、伪类和伪对象选择器、标签选择器以及统配选择器**。

所有在CSS样式中定义的选择符都是由这6种基础选择符组合而成的，组合的方式也分为三种：**后代选择符、子选择符、相邻选择符**。

CSS的权重指的是这些选择符的优先级，优先级高的CSS样式会覆盖优先级低的样式，优先级越高说明权重越高，反之亦然。

![enter description here][1]

图里是英文的，我翻译过来分别说一下，4个等级的定义如下：
* 第一等：代表内联样式，如: style=””，权值为1000。
* 第二等：代表ID选择器，如：#content，权值为100。
* 第三等：代表类，伪类和属性选择器，如.content，权值为10。
* 第四等：代表类型选择器和伪元素选择器，如div p，权值为1。

最后把这些值加起来，再就是当前元素的权重了。


按照规则，基础选择器具有这样的优先级：

　　　　　　ID > 类 | 伪类 | 属性选择 > 标签类型 | 伪对象 > 通配符


----------


**属性选择器** 
a[href] {color:red;}


**伪元素选择器**
伪元素的效果是需要通过添加一个实际的元素才能达到的。
```
/* 为某个元素的第一行文字使用样式。 */
:first-line
/* 为某个元素中的文字的首字母或第一个字使用样式。 */
:first-letter
/* 在某个元素之前插入一些内容。 */
:before
/* 在某个元素之后插入一些内容。 */
:after
```

>Css3之后伪元素 要用::

----------


1. 如果样式上加有!important标记，例如：
`p{ color: gray !important}`
那么始终采用这个标记的样式。
2. 匹配的内容按照CSS权重排序，权重大的优先。
3. 如果权重也一样，按照它在CSS样式表里声明的顺序，后声明的优先，例如：
```
h1 {color: blue}
h1 {color: red}
最终胜出的是color: red。
```

### 定义合适的选择符
　明白了CSS选择符的权重后，我们如何依照选择符的权重定义合适的选择符？

　　定义选择符的原则是：尽量使选择付的权重低，目的是保证样式在应用于多个元素时容易被覆盖，这可提高样式代码的重用性和可维护性。

具体的原则如下：
1. CSS样式中尽量不要使用ID选择器
ID选择器有很高的权重，如果要覆盖使用了ID选择器的样式，就必须在原先使用ID选择器的基础上添加新的选择符（类选择器或者标签类型选择器或者额使用个!important,但这样做的结果是无法重用的样式代码会越来越多）。

2. 减少子选择器的层级
减少选择器的层级的过程也是降低选择符整体权重的过程。

3. 使用组合的CSS类选择器
使用CSS选择器组合的方式，开发者可以不用考虑CSS样式覆盖的问题，避开了计算选择符权重的过程，同时也提高了代码的重用性。





## 补充

### !important修改权重

[网页链接](https://www.cnblogs.com/tianma3798/p/6202008.html)


!important为开发者提供了一个增加样式权重的方法。应当注意的是!important是对整条样式的声明，包括这个样式的属性和属性值。

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    .div1 {
        color: red !important;
        /*color: red;*/
    }
    
    #div1 {
        color: blue;
        font-weight: bold;
    }
    </style>
</head>

<body>
    <div class="div1" id='div1' style='color:green;'>
        <p>div1内容</p>
        <span>span中的内容</span>
    </div>
</body>

</html>
```

1. !important会修改当前对应元素的当前css属性和值得权重
2. !important指定的属性权重比class选择器，ID选择器，内联样式的权重都高。
3. !important只对当前元素当前属性权重有影响，对子元素权重没影
4. 如果在在不同选择器中，相同属性和值都指定了!important，选择器权重高的属性起作用

例如：
```
    .div1 {
        color: red !important;
    }
    
    #div1 {
        color: blue !important;
    }
```
浏览器解析结果，div中颜色为蓝色。


>关键字!important必须放在一行样式的末尾并且要放在该行分号前，否则就没有效果


**非到万不得已不要用!important。如果你是出于懒惰使用!important，为了避免例行的调试而滥用它，那么你（或者是那些后继开发你项目的人）将会深受其害。**






  [1]: https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh=600,800/sign=4a0826fc9d22720e7b9beafc4bfb267e/b219ebc4b74543a9c1d979521b178a82b8011469.jpg