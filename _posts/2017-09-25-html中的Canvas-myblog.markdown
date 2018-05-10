---
layout:     post
title:      "html中的Canvas"
date:       2017-09-25 12:56:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/tags/html_ref_canvas.asp)

HTML5 `<canvas>` 标签用于绘制图像（通过脚本，通常是 JavaScript）。
不过，`<canvas>` 元素本身并没有绘制能力（它仅仅是图形的容器）-您必须使用脚本来完成实际的绘图任务。
getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属。


**getContext("2d") 对象属性和方法，可用于在画布上绘制文本、线条、矩形、圆形等等。**

### 属性
* fillStyle	设置或返回用于填充绘画的颜色、渐变或模式
* strokeStyle	设置或返回用于笔触的颜色、渐变或模式
* shadowColor	设置或返回用于阴影的颜色
* shadowBlur	设置或返回用于阴影的模糊级别
* shadowOffsetX	设置或返回阴影距形状的水平距离
* shadowOffsetY	设置或返回阴影距形状的垂直距离


### 方法
* createLinearGradient()	创建线性渐变（用在画布内容上）
* createPattern()	在指定的方向上重复指定的元素
* createRadialGradient()	创建放射状/环形的渐变（用在画布内容上）
* addColorStop()	规定渐变对象中的颜色和停止位置

### 线条样式
* lineCap	设置或返回线条的结束端点样式
* lineJoin	设置或返回两条线相交时，所创建的拐角类型
* lineWidth	设置或返回当前的线条宽度
* miterLimit	设置或返回最大斜接长度

### 矩形
* rect()	创建矩形
* fillRect()	绘制“被填充”的矩形
* strokeRect()	绘制矩形（无填充）
* clearRect()	在给定的矩形内清除指定的像素

### 路径
* fill()	填充当前绘图（路径）
* stroke()	绘制已定义的路径
* beginPath()	起始一条路径，或重置当前路径
* moveTo()	把路径移动到画布中的指定点，不创建线条
* closePath()	创建从当前点回到起始点的路径
* lineTo()	添加一个新点，然后在画布中创建从该点到最后指定点的线条
* clip()	从原始画布剪切任意形状和尺寸的区域
* quadraticCurveTo()	创建二次贝塞尔曲线
* bezierCurveTo()	创建三次方贝塞尔曲线
* arc()	创建弧/曲线（用于创建圆形或部分圆）
* arcTo()	创建两切线之间的弧/曲线
* isPointInPath()	如果指定的点位于当前路径中，则返回 true，否则返回 false

### 转换
* scale()	缩放当前绘图至更大或更小
* rotate()	旋转当前绘图
* translate()	重新映射画布上的 (0,0) 位置
* transform()	替换绘图的当前转换矩阵
* setTransform()	将当前转换重置为单位矩阵。然后运行 transform()

### 其他
* save()	保存当前环境的状态
* restore()	返回之前保存过的路径状态和属性
* createEvent()	 
* getContext()	 
* toDataURL()	 


### arc()
arc() 方法创建弧/曲线（用于创建圆或部分圆）。

context.arc(x,y,r,sAngle,eAngle,counterclockwise);


* x	圆的中心的 x 坐标。
* y	圆的中心的 y 坐标。
* r	圆的半径。
* sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
* eAngle	结束角，以弧度计。
* counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。


![enter description here][1]

>如需通过 arc() 来创建圆，请把起始角设置为 0，结束角设置为 2*Math.PI。



### createRadialGradient
[网页链接](http://www.360doc.com/content/15/1014/15/28180908_505594108.shtml)

createRadialGradient是canvas创建发射渐变的一个方法


createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd)


| 参数           | 描述               |
| -------------- | ------------------ |
| xStart, yStart | 开始圆的圆心的坐标 |
| radiusStart    | 开始圆的半径       |
| xEnd, yEnd     | 结束圆的圆心的坐标 |
| radiusEnd      | 结束圆的半径    |

```
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var cycle1 = {
    x: 150,
    y: 150,
    r: 25
}
var cycle2 = {
    x: 250,
    y: 250,
    r: 50
}
ctx.beginPath();
ctx.arc(cycle1.x, cycle1.y, cycle1.r, 0, Math.PI*2, false);
ctx.stroke();
ctx.beginPath();
ctx.arc(cycle2.x, cycle2.y, cycle2.r, 0, Math.PI*2, false);
ctx.stroke();
 
var gr = ctx.createRadialGradient(cycle1.x, cycle1.y, cycle1.r, cycle2.x, cycle2.y, cycle2.r);
gr.addColorStop(0, 'rgba(255, 0, 0, 0.75)');
gr.addColorStop(0.5, 'rgba(0, 255, 0, 0.75)');
gr.addColorStop(1, 'rgba(0, 0, 255, 0.75)');
 
ctx.fillStyle = gr;
ctx.fillRect(0, 0, 500, 500);
```


**其中两个圆相离的情况得到的渐变图案很神奇**。createRadialGradient实现的线性渐变的原理是：**发生渐变的区域是，cycle1上的点到cycle2上的点所连成区域**，所以当两个圆相离的时候，会形成放射状的扇形。可能还是有点难理解，把两个圆放到三维的场景下，就容易看懂了。

### save()和restore()

[网页链接](http://blog.csdn.net/oney139/article/details/8143281)


canvas.save();和canvas.restore();是两个相互匹配出现的，作用是用来保存画布的状态和取出保存的状态的。这里稍微解释一下，
当我们对画布进行旋转，缩放，平移等操作的时候其实我们是想对特定的元素进行操作，比如图片，一个矩形等，但是当你用canvas的方法来进行这些操作的时候，其实是对整个画布进行了操作，那么之后在画布上的元素都会受到影响，所以我们在操作之前调用canvas.save()来保存画布当前的状态，当操作之后取出之前保存过的状态，这样就不会对其他的元素进行影响

####  代码段1
```
    public void draw() {   
      Canvas canvas = sfh.lockCanvas();    
      canvas.drawColor(Color.BLACK);  
      canvas.drawBitmap(bmp1, 0,0,paint);  
      canvas.save();   
      canvas.scale(5f, 5f);  
      canvas.restore();   
      canvas.drawBitmap(bmp2, 0,0,paint);  
      sfh.unlockCanvasAndPost(canvas);    
    }  
```

#### 代码段2
```
    public void draw() {   
      Canvas canvas = sfh.lockCanvas();    
      canvas.drawColor(Color.BLACK);  
      canvas.drawBitmap(bmp1, 0,0,paint);  
      canvas.scale(5f, 5f);  
      canvas.drawBitmap(bmp2, 0,0,paint);  
      sfh.unlockCanvasAndPost(canvas);    
    }  
```

上面这两个代码片段中我们都假设有两张图片bmp1和bmp2，并且都画在画布上!

那么代码段1和代码段2的不同:

代码段1中我们进行画布缩放的之前保存了画布状态，做了缩放操作之后又取出之前保存的状态，这样做是为了保证bmp2正常画出来不受到缩放的影响！

代码段2里，画了bmp1后就执行了缩放操作，并且没有保存状态！紧接着画了bmp2，那么bmp2也会一样受到缩放的影响！！











  [1]: http://www.w3school.com.cn/i/arc.gif