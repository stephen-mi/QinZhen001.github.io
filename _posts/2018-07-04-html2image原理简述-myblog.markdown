---
layout:     post
title:      "html2image原理简述"
date:       2018-07-04 10:54:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Svg
---

> “Yeah It's on. ”


## 正文
[网页链接](https://juejin.im/post/5a9de7eff265da238c3a2bbe?utm_medium=be&utm_source=weixinqun)

[SVG `<foreignObject>`简介与截图等应用](https://www.zhangxinxu.com/wordpress/2017/08/svg-foreignobject)

使用svg的一个特性，允许在`<foreignobject>`标签中包含任意的html内容。（主要是 XMLSerializer | MDN这个api将dom转为svg） 所以，为了渲染那个dom节点，你需要采取以下步骤：

1. 递归 clone 原始的 dom 节点
2. 获取 节点以及子节点 上的 computed style，并将这些样式添加进新建的style标签中（不要忘记了clone 伪元素的样式）
3. 嵌入网页字体
     * 找到所有的@font-face
     * 解析URL资源，并下载对应的资源
     * base64编码和内联资源 作为 data: URLS引用
4. 内嵌图片(都转成dataUrl)
     * 内联图片src 的url 进 `<img>`元素
     * 背景图片 使用 background css 属性，类似fonts的使用方式
5. 序列化 clone 的 dom 节点 为 svg 
6. 将xml包装到`<foreignobject>`标签中，放入svg中，然后将其作为data: url
7. 将png内容或原始数据作为uint8array获取，使用svg作为源创建一个img标签，并将其渲染到新创建的canvas上，然后把canvas转为base64


```javascript
   var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image(),
        base64 = ''

    img.src = './about-bg.jpg'
    img.setAttribute("crossOrigin", 'anonymous')
    img.onload = function () {
        ctx.drawImage(img, 0, 0)
        base64 = canvas.toDataURL('image/png')
        console.log(base64)
    }
```

问题提示：

Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.

**图片存在跨域问题**



## 补充


### SVG forginObject元素

`<foreignObject>`元素的作用是可以在其中使用具有其它XML命名空间的XML元素，换句话说借助`<foreignObject>`标签，我们可以直接在SVG内部嵌入XHTML元素，举个简单的例子：

```css
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="120" height="50">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <p>文字。</p>
      </body>
    </foreignObject>
</svg>
```


可以看到<foreignObject>标签里面有一个设置了`xmlns="http://www.w3.org/1999/xhtml"`命名空间的`<body>`标签，此时`<body>`标签及其子标签都会按照XHTML标准渲染，实现了SVG和XHTML的混合使用。


这种混合特性有什么作用呢？作用很多，其中之一就是轻松实现SVG内的文本自动换行


#### SVG forginObject元素与文本自动换行
SVG要实现文本换行，往往需要手动阻断，类似下面的代码：

```css
<svg xmlns="http://www.w3.org/2000/svg">
  <text font-size="12">
    <tspan x="0" y="10">一段需要word wrap</tspan>
    <tspan x="0" y="26">的文字。</tspan>
  </text>
</svg>
```


>在 `<text>`元素中，利用内含的tspan元素，可以调整文本和字体的属性以及当前文本的位置、绝对或相对坐标值。


需要2个`<tspan>`元素，这一点都不工程。虽然Chrome浏览器可以对<text>标签进行white-space:normal的强制设置，但也只是Chrome浏览器可以。

但是如果使用`<foreignObject>`元素，则自动换行就是小菜：

```css
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="120" height="50">
      <body xmlns="http://www.w3.org/1999/xhtml">
        <p style="font-size:12px;margin:0;">一段需要word wrap的文字。</p>
      </body>
    </foreignObject>
</svg>
```


结果Chrome浏览器下效果为：


![enter description here][1]



#### SVG forginObject元素其它作用-图片生成

除了轻松实现文本换行，SVG `<foreignObject>`元素还有其他更高级的应用，就是可以将页面上的DOM元素轻松变成图片，原理如下：


1. 获取对应DOM元素的outerHTML代码；
2. 放在`<foreignObject>`元素中；
3. 图片方式显示我们的SVG图形，例如：


```css
<img width="300" height="150" src='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><foreignObject width="120" height="50"><body xmlns="http://www.w3.org/1999/xhtml"><p style="font-size:12px;margin:0;">一段需要word wrap的文字。</p></body></foreignObject></svg>'>
```


4. 上一步的图片本质还是SVG，我们可以借助canvas drawImage()方法将图片放在画布上，然后使用canvas.toDataURL()方法转换成png或jpg图片，核心代码： 

```javascript
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.drawImage(img, 0, 0);
img.src = canvas.toDataURL('image/png');
```








  [1]: https://image.zhangxinxu.com/image/blog/201708/2017-08-04_181137.png