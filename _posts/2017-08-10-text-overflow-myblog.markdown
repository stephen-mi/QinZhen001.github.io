---
layout:     post
title:      "文字与字体"
date:       2017-08-10 13:49:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.w3school.com.cn/cssref/pr_text-overflow.asp)

### text-overflow属性
clip|ellipsis|string;
* clip	修剪文本。	
* ellipsis	显示省略符号来代表被修剪的文本。	
* string	使用给定的字符串来代表被修剪的文本。


text-overflow只是用来说明文字溢出时用什么方式显示，要实现溢出时产生省略号的效果，还须定义强制文本在一行内显示（white-space:nowrap）及溢出内容为隐藏（overflow:hidden），代码如下：

```
text-overflow:ellipsis; 
overflow:hidden;    /*溢出内容为隐藏*/
white-space:nowrap; /*强制文本在一行内显示，直到遇到 <br> 标签为止。*/
```


【网易2016内推笔试题】

<p>这是一段长度超过P元素的文字</p>
p{width:100px; white-space:nowrap;}

问：添加哪个会使得超出的部分变成省略号“…”？ BD
A.white-space:normal
B.overflow:hidden
C.overflow:auto
D.text-overflow:ellipsis

### word-wrap属性

word-wrap也可以用来设置文本行为，当前行超过指定容器的边界时是否断开转。 
单词太长的话就超出某个区域，在CSS3中，实现文本强制文本进行换行的属性是word-wrap属性，当它的值等于break-word的时候，就可以实现文本强制换行，可以对单个单词进行拆分。

* normal为浏览器默认值；
* break-word设置在长单词或URL地址内部进行换行，此属性不常用，用浏览器默认值即可。

### 嵌入字体@font-face

@font-face能够加载服务器端的字体文件，让浏览器端可以显示用户电脑里没有安装的字体。
```
@font-face {
    font-family : 字体名称;
    src : 字体文件在服务器上的相对或绝对路径;
}
```

这样设置之后，就可以像使用普通字体一样在（font-*）中设置字体样式。

```
html:
<div class="demo">IMOOC</div>

css:
@font-face{
    font-family: "MOOC Font";
    src: url("http://www.imooc.com/Amaranth-BoldItalic.otf");
}
.demo {
    width: 340px;
    font-size:58px;
    font-family: "MOOC Font";
}
```

### 文本阴影text-shadow
* X-Offset：表示阴影的水平偏移距离，其值为正值时阴影向右偏移，反之向左偏移；
* Y-Offset：是指阴影的垂直偏移距离，如果其值是正值时，阴影向下偏移，反之向上偏移；
* Blur：是指阴影的模糊程度，其值不能是负值，如果值越大，阴影越模糊，反之阴影越清晰，如果不需要阴影模糊可以将Blur值设置为0；
* Color：是指阴影的颜色，其可以使用rgba色。

例如
text-shadow: 0 1px 1px #fff;
