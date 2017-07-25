---
layout:     post
title:      "toFixed和fixed"
date:       2017-07-24 10:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/jsref/jsref_tofixed.asp)

toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。

#### 语法
NumberObject.toFixed(num)

num	必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。

```
Show the number 13.37 with one decimal:
<script type="text/javascript">
var num = new Number(13.37);
document.write (num.toFixed(1))
</script>
输出：
Show the number 13.37 with one decimal:
13.4
```
---
fixed() 方法用于把字符串显示为打字机字体。
stringObject.fixed()

---

## 后记
