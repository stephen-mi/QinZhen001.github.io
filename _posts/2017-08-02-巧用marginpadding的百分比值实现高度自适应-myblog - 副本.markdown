---
layout:     post
title:      "巧用margin/padding的百分比值实现高度自适应"
date:       2017-08-02 15:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000004231995)

<strong>当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！</strong>

设置容器的padding-bottom/top
使用margin/padding的百分比值来解决自适应高度的关键在于：容器margin/padding的百分比参照物是父元素的宽度，而容器的width的百分比参照物也是父元素的宽度，俩属性参照物一致，那么想要把这俩属性的值统一起来就很简单了。
优化方案是这样的：给容器设置padding-top/padding-bottom跟width一致的值（百分比）。
```
#container {
  width: 50%;  //父元素宽度的一半
  background-color: red;  //仅为了方便演示
}
.placeholder {
  padding-top: 50%; //与width: 50%;的值保持一致，也就是相当于父元素宽度的一半。
}
<div id="container" class="placeholder"></div>
结果，容器的视觉效果如下：
```


容器的盒子模型如下：
<image src="https://segmentfault.com/img/bVrU1u"></image>


从盒子模型可以看出，虽然容器的内容高度为0，但由于有了跟内容宽度一致的padding，因此整体视觉效果上像是被撑开了。此方案浏览器兼容性很不错，唯一的缺陷是无法给容器设置max-height属性了，因为max-height只能限制内容高度，而不能限制padding（我原以为设置box-sizing: border-box;可以让max-height限制padding，不过亲测无效，明白的朋友麻烦告知一下原因）。

给子元素/伪元素设置margin/padding撑开容器
从上面的方案看出max-height失效的原因是容器的高度本来就是padding撑的，而内容高度为0，max-height无法起作用。那想要优化这一点，唯一的方法就是利用内容高度来撑开而非padding，这个方案跟消除浮动所用的方案非常相似：给容器添加一个子元素/伪元素，并把子元素/伪元素的margin/padding设为100%，使其实际高度相当于容器的宽度，如此一来，便能把容器的高度撑至与宽度一致了。由于添加子元素与HTML语义化相悖，因此更推荐使用伪元素(:after)来实现此方案。
```
#container {
  width: 50%;
  position: relative;
  background-color: red;
  overflow: hidden;  //需要触发BFC消除margin折叠的问题
}
.placeholder:after {
  content: '';
  display: block;
  margin-top: 100%; //margin 百分比相对父元素宽度计算
} 
<div id="container" class="placeholder"></div>
```
此时视觉效果上与上一方案无异，重点来看看此时容器的盒子模型：
![enter description here][2]

可以看出，此时容器的内容高度与内容宽度一致，妈妈再也不用担心我无法通过max-height来限制容器高度了。
另外，使用margin的话需要考虑margin折叠的问题（参考），padding则无此烦恼。

容器内部如何添加内容
上述方案只提及如何不依赖容器内容来撑开容器，那么，在撑开容器后，如何给容器添加内容（图片、文本等）呢？
答案很简单，那就是利用position: absolute;：
```
#container {
  width: 50%;
  position: relative;
  background-color: red;
  overflow: hidden;  //需要触发BFC消除margin折叠的问题
}
.placeholder:after {
  content: '';
  display: block;
  margin-top: 100%; //margin 百分比相对父元素宽度计算
} 
img {
  position: absolute;
  top: 0;
  width: 100%;
}
<div id="container" class="placeholder">
  <img src="http://img.arrayhuang.cn/product/miya-1060079/multiple/0.jpg@1e_415w_415h_1c_0i_1o_1x.jpg" />
</div>
```
效果如下：



## 后记
宽高不一致的自适应怎么做？
有朋友可能会问，上面提到的都是宽度与高度一致的情况，如果不一致那怎么办呢？其实自适应的重点在于，元素的宽高必须维持一个固定的比例，比如说宽高一致比例就是1:1，宽是高的两倍那就是2:1，只要这个比例是明确而且固定的，那么只需要相应地修改margin/padding的百分比值即可适应不同的宽高比例。


  [1]: https://segmentfault.com/img/bVrU1u
  [2]: https://segmentfault.com/img/bVrU2j
  [3]: https://segmentfault.com/img/bVrU4H