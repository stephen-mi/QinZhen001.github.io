---
layout:     post
title:      "vertical-align的一些理解"
date:       2017-09-18 10:58:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)



vertical-align “垂直的”+“对齐”的意思


* 长度	通过距离升高（正值）或降低（负值）元素。'0cm'等同于'baseline'
* 百分值 – %通过距离（相对于1line-height1值的百分大小）升高（正值）或降低（负值）元素。'0%'等同于'baseline'
* baseline	默认。元素的基线与父元素的基线对齐。
* sub	降低元素的基线到父元素合适的下标位置。
* super	升高元素的基线到父元素合适的上标位置。
* top	把对齐的子元素的顶端与line box顶端对齐。
* text-top	把元素的顶端与父元素内容区域的顶端对齐。
* middle	元素的中垂点与 父元素的基线加1/2父元素中字母x的高度 对齐。
* bottom	把对齐的子元素的底端与line box底端对齐。
* text-bottom	把元素的底端与父元素内容区域的底端对齐。
* inherit	采用父元素相关属性的相同的指定值。


----------

.test{vertical-align:-2px;}
元素相对于基线向下偏移两像素，这个常常用来修复单选框/复选框与12像素文字大小不对齐的问题

### 为什么我的vertical-align属性不起作用
vertical-align 称之为“inline-block依赖型元素

**只有一个元素属于inline或是inline-block（table-cell也可以理解为inline-block水平）水平，其身上的vertical-align属性才会起作用**。所以，类似下面的代码就不会起作用：

div{vertical-align:middle;}


----------

所谓inline-block水平的元素，就是既可以“吸”又可以“咬”的元素，既可以与inline水平元素混排，又能设置高宽属性的元素。哪些元素呢，例如图片，按钮，单复选框，单行/多行文本框等HTML控件，只有这些元素默认情况下会对vertical-align属性起作用。


虽然vertical-align属性只会在inline-block水平的元素上期作用，但是其影响到的元素涉及到inline属性的元素，这里千万记住，inline水平元素受vertical-align属性而位置改变等不是因为其对vertical-align属性敏感或起作用，而是受制于整个line box的变化而不得不变化的

### Tip
元素浮动之后就会变为块元素，即 display 属性为 block ，所以 vertical-align 属性就会不起作用。



### 幽灵空白节点
[http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

「幽灵空白节点」是个什么意思呢？
**在HTML5文档声明下，块状元素内部的内联元素的行为表现，就好像块状元素内部还有一个（更有可能两个-前后）看不见摸不着没有宽度没有实体的空白节点，这个假想又似乎存在的空白节点，我称之为“幽灵空白节点”。**

vertical-align默认值是baseline, 也就是基线对齐.






**一个inline-block元素，如果里面没有inline内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘，否则，其基线就是元素里面最后一行内联元素的基线。**

两个同尺寸的inline-block水平元素，唯一区别就是一个空的，一个里面有字符，代码如下：
```
.dib-baseline {
  display: inline-block; width: 150px; height: 150px;
  border: 1px solid #cad5eb; background-color: #f0f3f9;
}

<span class="dib-baseline"></span>
<span class="dib-baseline">x-baseline</span>
```

会发现，明明尺寸、display水平都是一样的，结果呢，两个却不在一个水平线上对齐，为什么呢？哈哈，上面的规范已经说明了一切。第一个框框里面没有内联元素，因此，基线就是容器的margin下边缘，也就是下边框下面的位置；而第二个框框里面有字符，纯正的内联元素，因此，第二个框框就是这些字符的基线，也就是字母x的下边缘了。于是，我们就看到了框框1下边缘和框框2里面字符x底边对齐的好戏。框框2有个小彩蛋，点击可以toggle其innerHTML，会发现，如果框框2里面没文字，就和框框1举案齐眉了。





### 补充
[http://image.zhangxinxu.com/flash/blog/201006/vertical-align-text-top.swf](http://image.zhangxinxu.com/flash/blog/201006/vertical-align-text-top.swf)





