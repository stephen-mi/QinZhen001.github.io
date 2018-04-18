---
layout:     post
title:      "vh,vw单位"
date:       2018-04-02 22:42:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文
[网页链接](https://juejin.im/entry/59b00e46f265da2491513bcc)

有没有一个单位不需要JS和CSS耦合在一起的单位？
答案是有的，就是vw／vh

* vw = view width
* vh = view height
这两个单位是CSS3引入的，以上称为视口单位允许我们更接近浏览器窗口定义大小。



### 视口单位(Viewport units)

Q：什么是视口？
A：在桌面端，视口指的是在桌面端，指的是浏览器的可视区域；而在移动端，它涉及3个视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）。



视口单位中的“视口”，桌面端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport。





| vw   | 1vw = 视口宽度的1%     |
| ---- | ---------------------- |
| vh   | 1vh = 视口高度的1%     |
| vmin | 选取vw和vh中最小的那个 |
| vmax | 选取vw和vh中最大的那个   |


在移动端 iOS 8 以上以及 Android 4.4 以上获得支持，并且在微信 x5 内核中也得到完美的全面支持。


### 仅使用vw作为CSS单位
1.根据设计稿的尺寸转换为vw单位(SASS函数编译)

```
//iPhone 6尺寸作为设计稿基准

$vm_base: 375; 
@function vm($px) {
    @return ($px / 375) * 100vw;
}
```

```
 < div class="mod_nav">
            < nav class="mod_nav_list" v-for="n in 5">
                < a href="#" class="mod_nav_list_item">
                    < span class="mod_nav_list_item_logo">
                < img src="http://jdc.jd.com/img/80">
                    < /span>
                    < p class="mod_nav_list_item_name">导航入口< /p>
                < /a>
            < /nav>
< /div>
.mod_nav {
    background: #fff;
    &_list {
        display: flex;
        padding: vm(15) vm(10) vm(10);
        &_item {
            flex: 1;
            text-align: center;
            font-size: vm(10);
            &_logo {
                display: block;
                margin: 0 auto;
                width: vm(40);
                height: vm(40);
                img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                }
            }
            &_name {
                margin-top: vm(2);
            }
        }
    }
}
```



### 最优做法——搭配vw和rem

**使用vm作为css单位代码量确实减少很多，但是你会发现它是利用视口单位实现，依赖于视口大小而自动缩放，失去了最大最小宽度的限制。**

所以，我们需要结合rem单位来实现布局，而rem正好可以动态改变根元素大小，做法是：

1. 给根元素大小设置vw–动态改变大小。
2. 限制根元素font-size的最大最小值，配合bosy加上最大最小宽度。




```
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vm_fontsize ) * 1rem;
}
// 根元素大小使用 vw 单位
$vm_design: 750;
html {
    font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```




