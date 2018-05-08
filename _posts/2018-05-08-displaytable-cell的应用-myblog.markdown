---
layout:     post
title:      "display:table-cell的应用"
date:       2018-05-08 23:29:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)


### 多行文字的垂直居中
html:
```
<div class="parent">
    <p class="son">会议认为，党的十八大以来，我国经济发展取得历史性成就、
                     发生历史性变革，为其他领域改革发展提供了重要物质条件。经济实力
                     再上新台阶，经济年均增长7.1%，成为世界经济增长的主要动力源和稳定器。
    </p>
</div>
```

css:
```
      .parent {
           display: table;
           width: 300px;
           height: 300px;
       }
       .son  {
           display: table-cell;
           height: 200px;
           background-color: yellow;
           vertical-align: middle;
       }
```


这里我们只需要将容器设为display:table然他成为一个块级表格元素，子元素display:table-cell使子元素成为表格单元格，然后就像在表格里一样，给子元素加个vertical-align: middle就行了,多行文字垂直居中啦。


### 大小不固定的图片的垂直居中
[https://github.com/QinZhen001/front-end-demo/blob/master/layout/vertical-center/index.html](https://github.com/QinZhen001/front-end-demo/blob/master/layout/vertical-center/index.html)



## 特别提醒
* table-cell不感知margin
* 设置float或某些position(如:absolute)会对table-cell布局造成破坏，可以考虑为之增加一个父div定义float等属性











