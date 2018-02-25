---
layout:     post
title:      "Css伪类和伪元素"
date:       2018-02-01 17:04:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.w3cplus.com/css/an-ultimate-guide-to-css-pseudo-classes-and-pseudo-elements.html)


关于伪元素和伪类先了解“pseudo”的含义
形容词 - 不是真实存在的但是又好像存在；假装的；假的； - 几乎，接近，或想要成为


### 伪类
伪类就是一种虚构的状态或者说是一个具有特殊属性的元素可以使用CSS进行样式修饰。常见的几种伪类是: :link , :visited , :hover , :active , **:first-child 以及 :nth-child**


结构性
结构性伪类目标是在文档树或者DOM树中添加额外的信息，这里不能被另外一种选择器或者组合所表示。

#### :FIRST-CHILD
:first-child伪类表示父元素的第一个子元素。

在下面这个示例中，第一个li元素的文本将是橙色。

HTML
```
<ul>
    <li>This text will be orange.</li>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
</ul>
```
CSS
```
li:first-child {
    color: orange;
}
```




#### FIRST-OF-TYPE
:first-of-type伪类表示在父容器内其所有种类元素的第一个元素。

在下面这个示例中，第一个li元素和第一个span元素的文本颜色将为橙色。

HTML
```
<ul>
    <li>This text will be orange.</li>
    <li>Lorem ipsum dolor sit amet. <span>This text will be orange.</span></li>
    <li>Lorem ipsum dolor sit amet.</li>
</ul>
```
CSS
```
ul :first-of-type {
    color: orange;
}
```

>对应  :last-child  和 :last-of-type





#### :NOT
:not伪类也被称为反伪类。基本上它接收一个参数，在括号内书写另外一个“选择器”。实际上参数可以是另外一个选择器。

这里可能是链接式的，但是不会包含:not选择器。

下面示例中。:not伪类匹配参数外的元素。

HTML
```
<ul>
    <li class="first-item">Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
</ul>
```
CSS

这里除了.first-item选择器所代表的li元素外，所有的文本颜色为橙色。
```
li:not(.first-item) {
    color: orange;
}
```




####  :NTH-CHILD
:nth-child伪类根据在标记中的顺序匹配一个或者多个元素。

这个伪类在CSS中是最灵活、最强健的伪类之一。

所有的:nth伪类都带有一个参数-在括号内书写一个公式。这个公式可能是一个整数，也可能为an+b或者是odd或even关键字。

在an+b公式中:
* a是一个数字(成为整数);
* n就是我们常说的n(换句话说就是键盘中键入的字母n);
* +是一个运算符，它可能是一个加号(+)或者减号(-);
* b也表示一个整数，但是仅在运营商的需求要求下使用。


使用希腊的字母表，这里有一个基本的HTML结构的示例:
```
<ol>
    <li>Alpha</li>
    <li>Beta</li>
    <li>Gamma</li>
    <li>Delta</li>
    <li>Epsilon</li>
    <li>Zeta</li>
    <li>Eta</li>
    <li>Theta</li>
    <li>Iota</li>
    <li>Kappa</li>
</ol>
```
CSS

让我们选择第二个子元素。所以只有"Beta"文本为橙色。
```
ol :nth-child(2) {
    color: orange;
}
```
现在让我们从第二个子元素进行选择。所以"Beta","Delta","Zeta","Theta"以及"Kappa"文本为橙色。
```
ol :nth-child(2n) {
    color: orange;
}
```
让我们选择所有偶数的子元素:
```
ol :nth-child(even) {
    color: orange;
}
```
让我们从第六个子元素开始，选择一下其它的子元素。这里"Zeta","Theta"以及"kappa"文本将为橙色。
```
ol :nth-child(2n+6) {
    color: orange;
}
```


#### ONLY-CHILD
:only-child伪类指定只有一个孩子的父元素。

在下面的示例中，第一个ul只有一个孩子，所以其文本将变为橙色。第二个ul有两个孩子，因此其不会受:nth-child伪类的影响。

HTML
```
<ul>
    <li>This text will be orange.</li>
</ul>
<ul>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
</ul>
```
CSS
```
ul :only-child {
    color: orange;
}
```

#### ONLY-OF-TYPE
:only-of-type伪类指定一个元素没有特殊类型的兄弟元素。这和:only-child是十分相似的，只不过我们可以指定一个特殊类型的元素使我们的选择器更具有意义。

在下面的示例中，第一个ul只有一个孩子，其文本将变为橙色。

HTML
```
<ul>
    <li>This text will be orange.</li>
</ul>

<ul>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
</ul>
```
CSS
```
li:only-of-type {
    color: orange;
}
```


#### :TARGET
:target伪类...指定一个具有特殊ID元素一个URL中的hash。

在下面的示例中，article具有target的ID，当浏览器中的URL以#target结束时，其将会被指定。

URL
```
http://awesomebook.com/#target
```
HTML
```
<article id="target">
    <h1><code>:target</code> pseudo-class</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
</article>
```
CSS
```
:target {
    background: yellow;
}
```


#### :CHECKED
:checked伪类指定单选按钮，复选框以及已经被选择的选项元素。

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
原文: https://www.w3cplus.com/css/an-ultimate-guide-to-css-pseudo-classes-and-pseudo-elements.html © w3cplus.com











#### 在Sass中
```
@mixin links ($link, $visited, $hover, $active) {
    & {
        color: $link;
        &:visited {
            color: $visited;
        }
        &:hover {
            color: $hover;
        }
        &:active, &:focus {
            color: $active;
        }
    }
}
```
用法:
```
a {
    @include links(orange, blue, yellow, teal);
}
```
编译为:
```
a {
  color: orange;
}
a:visited {
  color: blue;
}
a:hover {
  color: yellow;
}
a:active, a:focus {
  color: teal;
}
```


### 伪元素
它们更像是虚拟的元素可以和HTML元素一样对待。区别在于它们并不存在于文档树或者DOM之中。这意味着我们并没有真正的指定伪元素，但是可以使用CSS进行创建。

常见的几种伪元素是: :after , :before 以及 :first-letter


### 伪元素使用单冒号还是双冒号

在大多数情况下，两者均可。

CSS3中引入双冒号(::)是为了在伪类中，如:hover,:active,区分伪元素，如::before，::after。除了IE8及其以下版本不支持外，所有的浏览器均支持伪元素中双冒号的使用。

一些伪元素，如::backdrop只接受双冒号的使用。

>无需向后兼用处理的话，伪类用:,伪元素用::



### CSS 生成内容
通过CSS生成内容是通过content属性结合:before或者:after伪元素实现的。

这里的“内容”可能是纯文本或者是通过操纵CSS来显示图形形状或者装饰元素的一个容器。



由于以下几个原因，生成内容不适用于重要副本或者文本:

* 对于屏幕阅读器是不可读的。
* 不可以进行选择。
* 如果生成的内容使用过多的内容进行修饰，屏幕阅读器会将其放大化，从而导致较为糟糕的用户体验。


使用CSS生成内容用于修饰或者一些非重要的文本信息，需要处理好与屏幕阅读器的关系，这样子才可以确保使用辅助技术的人可以拥有最佳的使用效果。当你使用CSS生成内容时，要时刻考虑"渐进增强"地设计理念。

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
原文: https://www.w3cplus.com/css/an-ultimate-guide-to-css-pseudo-classes-and-pseudo-elements.html © w3cplus.com






