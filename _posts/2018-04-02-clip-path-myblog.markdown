---
layout:     post
title:      "clip-path属性"
date:       2018-04-02 20:49:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 正文
[网页链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
clip-path属性可以创建一个只有元素的部分区域可以显示的剪切区域。区域内的部分显示，区域外的隐藏。剪切区域是被引用内嵌的URL定义的路径或者外部svg的路径，或者作为一个形状例如circle().。clip-path属性代替了现在已经弃用的剪切 clip属性。

```
/* Keyword values */
clip-path: none;

/* Image values */ 
clip-path: url(resources.svg#c1);

/* Box values
clip-path: fill-box;
clip-path: stroke-box;
clip-path: view-box;
clip-path: margin-box
clip-path: border-box
clip-path: padding-box
clip-path: content-box

/* Geometry values */
clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px); //注意这个
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

/* Box and geometry values combined */
clip-path: padding-box circle(50px at 0 100px);

/* Global values */
clip-path: inherit;
clip-path: initial;
clip-path: unset;
```


### 语法

url()
    代表剪切元素的路径
    
inset(), circle(), ellipse()椭圆, polygon()多边形
一个 `<basic-shape>` 方法. 这种形状将会利用指定的`<geometry-box>`来定位和固定基本形状。如果没有geometry box（几何盒模型）特别指出的话，border-box将会是默认的盒模型。

`<geometry-box>`
    如果同`<basic-shape>`一起声明，它将为基本形状提供相应的参考盒子。通过自定义，它将利用确定的盒子边缘包括任何形状边角（比如说，被border-radius定义的剪切路径）。几何体盒子将会有以下的值：

fill-box
        利用对象边界框作为引用框。
        
stroke-box
        使用笔触边界框作为引用框
        
view-box
        使用最近的SVG视口作为引用框。如果viewBox 属性被指定来为元素创建SVG视口，引用框将会被定位在坐标系的原点，引用框位于由view-box属性建立的坐标系的原点，引用框的尺寸用来设置viewbox属性的宽高值。
        
margin-box
        使用 margin box 作为引用框
        
border-box
        使用 border box 作为引用框.
        
padding-box
        使用 padding box 作为引用框.
        
content-box
        使用 content box 作为引用框





### 成形
clip-path的前身是SVG, 所以，我们的坐标都是二维的。

关于使用polygon构建标准多边形，可以看这里：
[http://codepen.io/wenbin5243/pen/iheHF](http://codepen.io/wenbin5243/pen/iheHF)


![enter description here][1]


clip-path家族的polygon生成三角要更简单也更强大

打个背景色，搞三个点就可以了，例如(自身尺寸20px*20px)：
```
.path {
    clip-path: polygon(5px 10px, 16px 3px, 16px 17px);
}
```




![左三角][2]




### 变形
clip-path可以transition过渡或者animation动画。比方说——不规则图形变换效果，很好地填补了CSS3 transform变换的不足。


transform变换本质是基本矩阵变换，因此，也就是转一转，拉一拉。对于，复杂图形变换效果，比方说，矩形变成三角，乌龟变小鸟之类的，就只能望码兴叹了。然，clip-path就可以搞定。


polygon的动画变形的条件:
**坐标的数目变形前后必须一致**



### 常用
【五边形】
clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);

【六边形】
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

【七边形】
clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);

【八边形】
clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);


鼠标移入时开始变形(切角效果向正方形的变形过程)
```
.outer{
  width:100px;
  height: 100px;
  background:orange;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  transition:.5s clip-path;
}  
.outer:hover{
  clip-path:polygon(0 0,0 0,100% 0,100% 0,100% 100%,100% 100%,0 100%,0 100%);
}
<div class="outer"></div>
```



  [1]: http://image.zhangxinxu.com/image/blog/201503/2015-03-25_231542.png
  [2]: http://image.zhangxinxu.com/image/blog/201503/2015-03-25_232746.png