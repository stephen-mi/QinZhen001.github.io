---
layout:     post
title:      "jQuery中toggle与slideToggle以及fadeToggle的比较"
date:       2017-10-29 22:33:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - jQuery
---

> “Yeah It's on. ”


## 正文

操作元素的显示和隐藏可以有几种方法。

* 改变样式display为none
* 设置位置高度为0
* 设置透明度为0

都能达到这个目的，并且针对这样的处理jQuery都提供了各自的方法。show/hide、sildeDown/sildeUp、fadeIn/fadeOut。除此之外，还引入了toggle、sildeToggle以及fadeToggle切换方法

### toggle、sildeToggle以及fadeToggle的区别：

* toggle：切换显示与隐藏效果
* sildeToggle：切换上下拉卷滚效果
* fadeToggle：切换淡入淡出效果

### toggle与slideToggle细节区别：

* toggle：动态效果为从右至左。横向动作，toggle通过display来判断切换所有匹配元素的可见性
* slideToggle：动态效果从下至上。竖向动作，slideToggle 通过高度变化来切换所有匹配元素的可见性

### fadeToggle方法

* fadeToggle() 方法在 fadeIn() 和 fadeOut() 方法之间切换。
* 元素是淡出显示的，fadeToggle() 会使用淡入效果显示它们。
* 元素是淡入显示的，fadeToggle() 会使用淡出效果显示它们。

**注释：隐藏的元素不会被完全显示（不再影响页面的布局）**





```
    <h2>toggle与slideToggle以及fadeToggle的比较</h2>
    <p>测试文字淡入效果</p>
    <p>慕课网,专注分享</p>
    动画切换：
    <select id="animation">
        <option value="1">toggle</option>
        <option value="2">slideToggle</option>
        <option value="3">fadeToggle</option>
    </select>
    <input id="btnShow" type="button" value="点击切换" />
    <script type="text/javascript">

    $("#btnShow").click(function() {
        var v = $("#animation").val();
        if (v == "1") {
            $("p").toggle();
        } else if (v == "2") {
            $("p").slideToggle("slow");
        } else if (v == "3") {
            $("p").fadeToggle(1000, "linear");
        }
    });
    </script>
```

