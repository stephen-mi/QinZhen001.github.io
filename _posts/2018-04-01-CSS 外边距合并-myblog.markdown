---
layout:     post
title:      "CSS 外边距合并"
date:       2018-04-01 20:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/css/css_margin_collapsing.asp)


[github代码](https://github.com/QinZhen001/animation-demo/blob/master/other/margin-top.html)


**外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者**。



### 外边距合并

外边距合并（叠加）是一个相当简单的概念。但是，在实践中对网页进行布局时，它会造成许多混淆。

简单地说，外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并。请看下图：




![enter description here][1]




当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上和/或下外边距也会发生合并。请看下图：


![enter description here][2]


尽管看上去有些奇怪，但是外边距甚至可以与自身发生合并。

假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并：

![enter description here][3]

外边距合并初看上去可能有点奇怪，但是实际上，它是有意义的。以由几个段落组成的典型文本页面为例。第一个段落上面的空间等于段落的上外边距。如果没有外边距合并，后续所有段落之间的外边距都将是相邻上外边距和下外边距的和。这意味着段落之间的空间是页面顶部的两倍。如果发生外边距合并，段落之间的上外边距和下外边距就合并在一起，这样各处的距离就一致了。


![enter description here][4]





### margin折叠的产生条件
* 这些margin都处于普通流中，并在同一个BFC中；
* 这些margin没有被非空内容、padding、border 或 clear 分隔开；
* 这些margin在垂直方向上是毗邻的，包括以下几种情况：
  * 一个box的top margin与第一个子box的top margin
  * 一个box的bottom margin与紧接着的下一个box的top margin
  * 一个box的top margin与其自身的bottom margin，但须满足没创建BFC、零min-height、零或者“auto”的height、没有普通流的子box



### 折叠边距的计算
当两个margin都是正值的时候，取两者的最大值；当 margin 都是负值的时候，取的是其中绝对值较大的，然后，从 0 位置，负向位移；当有正有负的时候，先取出负 margin 中绝对值中最大的，然后，和正 margin 值中最大的 margin 相加。但必须注意，所有毗邻的margin要一起参与运算，不能分步进行。



### 解决方案
* 给父元素添加padding-top值
* 给父元素添加border值
* 给父元素添加属性overflow:hidden;
* 给父元素或者子元素声明浮动float
* 使父元素或子元素声明为绝对定位：position:absolute;
* 给父元素添加属性 overflow:auto或positon:relative；



## 补充

### margin值的单位为%
实际上这时候百分比（%）是相对于该元素的父元素（容器），对于同级元素和父子元素都是如此。


  [1]: http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_1.gif
  [2]: http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_2.gif
  [3]: http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_3.gif
  [4]: http://www.w3school.com.cn/i/ct_css_margin_collapsing.gif