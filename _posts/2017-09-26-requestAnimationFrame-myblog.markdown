---
layout:     post
title:      "requestAnimationFrame"
date:       2017-09-26 16:15:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Html
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/?replytocom=58195#respond)

**请求动画帧**

requestAnimationFrame就是为了这个而出现的。做的事情很简单，跟着浏览器的绘制走，如果浏览设备绘制间隔是16.7ms，那我就这个间隔绘制；如果浏览设备绘制间隔是10ms, 我就10ms绘制。这样就不会存在过度绘制的问题，动画不会掉帧，自然流畅


浏览器（如页面）每次要洗澡（重绘），就会通知requestAnimationFrame

```
		const frame = ()=>{
		    count++
		    count % 10 == 0 && stars.blink()
		    moon.draw()
		    stars.draw()

		    meteors.forEach((meteor, index, arr)=> {
		        //如果流星离开视野之内，销毁流星实例，回收内存
		        if (meteor.flow()) {
		            meteor.draw()
		        } else {
		            arr.splice(index, 1)
		        }
		    })
		    requestAnimationFrame(frame)
		}
		frame() //调用函数
```		
