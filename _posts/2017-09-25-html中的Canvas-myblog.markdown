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
