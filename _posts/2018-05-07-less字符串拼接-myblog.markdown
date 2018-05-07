---
layout:     post
title:      "less字符串拼接"
date:       2017-05-07 11:59:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Less
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/butterfly5211314/article/details/72667273)
```
@iconUrl: "/img";

// mixin
.c-icon(@bgImg) {
    background-image: url(@bgImg);
}


.bg {
    @someImgUrl: "/icon.png";

    // call mixin .c-icon();
    .c-icon("@{iconUrl}@{someImgUrl}");

    // or below
    // .c-icon("@{iconUrl}/icon.png");
}
```

**字符串拼接中取字符串以@{varName}这种形式即可**




## 补充
在stylus中变量可以直接拼接成字符串
```
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
```





