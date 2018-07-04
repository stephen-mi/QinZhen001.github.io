---
layout:     post
title:      "Data URL加载图片"
date:       2018-07-04 11:47:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.webhek.com/post/data-url.html)


Data URL给了我们一种很巧妙的将图片“嵌入”到HTML中的方法。跟传统的用img标记将服务器上的图片引用到页面中的方式不一样，在Data URL协议中，图片被转换成base64编码的字符串形式，并存储在URL中，冠以mime-type。


### Data URL基本原理

图片在网页中的使用方法通常是下面这种利用img标记的形式：

`<img src="images/myimage.gif ">`


这种方式中，img标记的src属性如果指定了一个远程服务器上的资源。当网页加载到浏览器中时，浏览器会针对每个外部资源都向服务器发送一次拉取资源请求，占用网络资源。大多数的浏览器都有一个并发请求数不能超过4个的限制。这意味着，如果一个网页里嵌入了过多的外部资源，这些请求会导致整个页面的加载延迟。而使用Data URL技术，图片数据以base64字符串格式嵌入到了页面中，与HTML成为一体


```
 <img src="data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">
```

 <img src="data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">



从上面的base64字符串中你看不出任何跟图片相关的东西，但下面，我们将传统的img写法和现在的Data URL用法左右对比显示，你就能看出它们是完全一样的效果。但实际上它们是不一样的，它们一个是引用了外部资源，一个是使用了Data URL。

几乎所有的现代浏览器都支持Data URL格式，包括火狐浏览器，谷歌浏览器，Safari浏览器，opera浏览器。IE8也支持，但有部分限制，IE9完全支持。



### 为什么Data URL是个好东西

Data URL能用在很多场合，跟传统的外部资源引用方式相比，它有如下独到的用处：



* 当访问外部资源很麻烦或受限时
* 当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时。
* 当图片的体积太小，占用一个HTTP会话不是很值得时。



Data URL也有一些不适用的场合


* Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3。
* Data URL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。


然而，Data URL这些不利的地方完全可以避免或转化。



### 在CSS里使用Data URL

 分享：

Data URL给了我们一种很巧妙的将图片“嵌入”到HTML中的方法。跟传统的用img标记将服务器上的图片引用到页面中的方式不一样，在Data URL协议中，图片被转换成base64编码的字符串形式，并存储在URL中，冠以mime-type。本文中，我将介绍如何巧妙的使用Data URL优化网站加载速度和执行效率。

        Data URL基本原理
        为什么Data URL是个好东西
        在CSS里使用Data URL
        将图片转换成Data URL格式
        Data URL总结

观看演示

1. Data URL基本原理

图片在网页中的使用方法通常是下面这种利用img标记的形式：

   <img src="images/myimage.gif ">

这种方式中，img标记的src属性指定了一个远程服务器上的资源。当网页加载到浏览器中时，浏览器会针对每个外部资源都向服务器发送一次拉取资源请求，占用网络资源。大多数的浏览器都有一个并发请求数不能超过4个的限制。这意味着，如果一个网页里嵌入了过多的外部资源，这些请求会导致整个页面的加载延迟。而使用Data URL技术，图片数据以base64字符串格式嵌入到了页面中，与HTML成为一体，它的形式如下：

 <img src="data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">




>一个完整的 dataURI 应该是这样的：
>
>`data:[<mediatype>][;base64],<data>`
>
>其中mediatype声明了文件类型，遵循MIME规则，如“image/png”、“text/p>lain”；之后是编码类型，这里我们只涉及 base64


从上面的base64字符串中你看不出任何跟图片相关的东西，但下面，我们将传统的img写法和现在的Data URL用法左右对比显示，你就能看出它们是完全一样的效果。但实际上它们是不一样的，它们一个是引用了外部资源，一个是使用了Data URL。
thufir

几乎所有的现代浏览器都支持Data URL格式，包括火狐浏览器，谷歌浏览器，Safari浏览器，opera浏览器。IE8也支持，但有部分限制，IE9完全支持。

2. 为什么Data URL是个好东西

Data URL能用在很多场合，跟传统的外部资源引用方式相比，它有如下独到的用处：

        当访问外部资源很麻烦或受限时
        当图片是在服务器端用程序动态生成，每个访问用户显示的都不同时。
        当图片的体积太小，占用一个HTTP会话不是很值得时。

Data URL也有一些不适用的场合

        Base64编码的数据体积通常是原数据的体积4/3，也就是Data URL形式的图片会比二进制格式的图片体积大1/3。
        Data URL形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。

然而，Data URL这些不利的地方完全可以避免或转化。本文的重点就是要讨论这个问题。

3. 在CSS里使用Data URL

当第一次看到Data URL的作用和用法时，你也许会很不疑惑，“为什么要麻烦的将图片转换成base64编码字符串，还要嵌入的网页中，将HTML代码弄的混乱不堪，甚至还会有性能上的问题。”


诚然，无法否认缓存在浏览器性能中的重要作用——如何能将Data URL数据也放入浏览器缓存中呢？


**答案是：通过CSS样式文件。CSS中的url操作符是用来指定网页元素的背景图片的，而浏览器并不在意URL里写的是什么——只要能通过它获取需要的数据。所以，我们就有了可以将Data URL形式的图片存储在CSS样式表中的可能。而所有浏览器都会积极的缓存CSS文件来提高页面加载效率。**


----------

假设我们的页面里有一个很小的div元素，我们想用一种灰色的斜纹图案做它的背景，这种背景在当今的网站设计者中非常流行。传统的方法是制作一个3×3像素的图片，保存成GIF或PNG格式，然后在CSS的background-image属性中引用它的地址。而Data URL则是一种更高效的替代方法，就像下面这样。



下面是CSS代码：


```css
.striped_box
  {
  width: 100px;
  height: 100px;
  background-image: url("data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7");
  border: 1px solid gray;
  padding: 10px;
  }
```

在我们的HTML里放入下面的代码：

 
```html
<div class="striped_box">
这是一个有条纹的方块
</div>
```




在这个例子中，Data URL的使用是完全符合场景的。它避免了让这个小小的背景图片独自产生一次HTTP请求，而且，这个小图片还能同CSS文件一起被浏览器缓存起来，重复使用，不会每次使用时都加载一次。只要这个图片不是很大，而且不是在CSS文件里反复使用，就可以以Data URL方法呈现图片降低页面的加载时间，改善用户的浏览体验。














