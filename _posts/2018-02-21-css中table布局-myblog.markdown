---
layout:     post
title:      "css中table布局"
date:       2018-02-21 14:17:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000007007885)

### table标签（display:table）

1) table可设置宽高、margin、border、padding等属性。属性值的单位可以使用px，百分比值。
2) table的宽度默认由内容的宽高撑开，如果table设置了宽度，宽度默认被它里面的td平均分，如果给某一个td设置宽度，那么table剩余的宽度会被其他的td平均分（有点类似flex布局）
3) 给table设置的高度起到的作用只是min-height的作用，当内容的高度高于设置的高度时，table的高度会被撑高。


### tr标签（display:table-row）

1) 给tr设置高度只起到min-height的作用，默认会平分table的高度。
2) tr中的td默认高度会继承tr的高度，若给任一td设置了高度，其他td的高度也同样变高。适合多列等高布局
3) 设置宽度、margin、都不起作用


### td标签（display:table-cell）
1) td默认继承table的高度，且平分table的宽度
2) 若table（display:table）不存在，给td设置的宽高不能用百分比只能用准确的数值
3) 给td设置vertical-align: middle; td元素里面(除float、position:absolute)所有的块级、非块级元素都会相对于td垂直居中
4) 给td设置text-align: center; td元素里面所有非block元素(除float、position:absolute)都会相对于td水平居中，虽然block元素不居中，但其中的文字或inline元素会水平居中




### 图片定高|不定高水平垂直居中
>了解了table的一些属性，当我们遇到一些水平垂直居中的布局时，就会变得so easy了。

图片本身就是inline-block元素，那么我们只要给它的父级元素加个display:table-cell就好了
```
.box{
    height: 200px;
    width: 200px;
    display: table-cell;
    text-align: center;
    border: 1px solid #ccc;
    vertical-align: middle;
}
<div class="box">
    <img src="https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/242dd42a2834349b406751a3ceea15ce36d3beb6.jpg">
</div>
```

### 多行定高|不定高|定宽|不定宽水平垂直居中
>我们平时常见的就是单行水平垂直居中，其实就是简单的text-align：center; 然后再是line-height:xx 就搞定了。但是多行的就相对于复杂点。但是使用了table-cell之后，就变得很简单了




其实实现的原理还是使用table-cell，先把外层box设置为table-cell，再把里面的元素设置为inline|inline-block(不定宽高|元素居中)或者block(宽度100%|文字居中)那么就可以控制里面的元素水平垂直居中了。基于这样的布局方式，你就可以把什么定高|不定高|定宽|不定宽|多行|单行的水平垂直居中都搞定了。



### 多列等高布局
有这样的需求，一行有三个item，三个item的高度不定，但是这一行的三个item最终的高度以最高的那个为准。按照以前的做法要不就是砍掉需求，必须定高。实在不行就是等加载完之后用js计算三个item的高度，然后把最高的高度给其他item设置高度。这样有点恶心，并且会出现抖动。有了table-cell之后，这个就不成问题了，因为在一个tr中，里面的td必须是等高的，而不管里面内容的高度


## 总结
使用table-cell还可以实现很多的布局，需要自己去发挥想象。总结下来也就需要记住几点，设置了display:table-cell的元素具有以下特性。

1. text-align、vertical-align等对齐属性起作用，margin不起作用。宽高百分比值不起作用。
2. 会生成虚拟的table、tr把自己包裹住，如果有相邻的兄弟元素也被设置了table-cell,则会跟兄弟元素一起生成虚拟的table、tr把自己包裹住，并一行等高显示
3. 多个table-cell元素会占满被设置了display: table的元素的宽度，如果一个元素被设置了宽度，那么其他剩余的table-cell元素会占满剩下的宽度。当然，如果只有一个table-cell元素，就算设置了宽度也会占满table元素的宽度。
4. 对设置了float、absolute的元素不起作用。且IE6、7不支持


### display: inline-block


* inline-block元素把自己变成特殊的inline元素，对于相邻的元素来说表现出inline的特点，允许空格。对于内部元素来说表现出block元素的特点，可以设置高度和宽度。
* 空格是两个标签中存在换行符or制表符or空格符（其实就是缩进）的原因生产的，只需要给设置了inline-block属性的父元素设置font-size:0,就可以使标签中的空格失去宽度











