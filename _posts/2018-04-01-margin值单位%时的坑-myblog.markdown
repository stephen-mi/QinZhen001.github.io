---
layout:     post
title:      "margin值单位%时的坑"
date:       2018-04-01 20:50:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/wangjian8888/p/6127519.html)


**实际上这时候百分比（%）是相对于该元素的父元素（容器），对于同级元素和父子元素都是如此。**


### 在水平方向使用值为%的margin
情况正常


### 在竖直方向使用值为%的margin
```

<head>
    <meta charset="UTF-8">
    <title>margin</title>
    <style>
        *{
            margin:0;
            padding:0;
        }
        .first{
            width: 200px;
            height: 200px;
            background: green;
        }
        .second{
            width: 200px;
            height: 200px;
            background: red;
            margin-top: 10%;
        }
    </style>
</head>
<body>
    <div class="first">高为200，无margin</div>
    <div class="second">高为200,margin-top为20%;</div>
</body>
</html>
```

**我们发现，当我在缩小浏览器的高度时，竖直方向上的间距并没有缩小！！！ 而当我缩小浏览器的宽度时，竖直方向上的距离缩小了！！！**


**这就说明：统计元素之间在竖直方向上使用margin，当值的单位为%时，它是相对于父元素的宽度。**



margin：百分比的计算基于生成框的包含块的宽度（margin-top/bottom也是如此）。
padding与之类似。


margin/padding-top/bottom 的百分比之所以按照 width 计算，其实理由很简单，就是要匹配主要的 use cases。那就是——要构建在纵横两个方向上相同的 margin/padding。如果两个百分比的相对方式不同，那用百分比就无法得到垂直和水平一致的留白。

有人也许会问，为什么不是垂直方向上的 height 而是水平方向的 width？这其实容易理解。因为 CSS 的基本模型是着重于“排版”的需求，因此水平和垂直方向其实并不是同等权重的，更精确的说，是文字书写方向决定的。常见的横排文字时，我们排版的出发点是水平宽度一定，而垂直方向上是可以无限延展的。竖排文字则相反。所以在竖排文字时，margin/padding-* 其实就都按照 height 而不是 width 计算了。类似的且大家更熟悉的是 margin-top/bottom 在垂直方向上的 collapse（或者当竖排文字时是 margin-left/right 水平方向上的 collapse）。为什么只有垂直方向 collapse 而水平就不呢？因为在典型的排版中，段落间的空白进行 collapse 是常见和方便的。而反过来水平方向上就几乎没有那样的需求（只有表格在两个方向上有对称的 border collapse 的需求）。同样的，在排版中，横向百分比控制是常见的需求，但是纵向其实很少这样的需求。有这样需求的其实是GUI界面布局



作者：贺师俊
链接：https://www.zhihu.com/question/20983035/answer/16801491
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。








