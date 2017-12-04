---
layout:     post
title:      "Box-shadow常被遗忘的一个参数——“spread”"
date:       2017-11-29 19:14:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Css
---

> “Yeah It's on. ”


## 正文


[网页链接](https://www.w3cplus.com/css3/css3-box-shadows-unnoticed-spread)

box-shadow: 0 10px 10px #ccc;
和
box-shadow: 0 10px 10px -10px #ccc;



这两种写法哪种是正确的。一开始我以为第二种是错误的写法，但找到相关教程，才恍然大悟，原来上面的两种写法都是正确的。为什么会造成这样的错误的想法呢？在我看来是我们把“box-shadow”中的第四个可选参数**扩展阴影半径——spread**给遗忘了。


----------

E {box-shadow:inset x-offset y-offset blur-radius spread-radius color} 换句说： 对象选择器 {text-shadow:投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色}


----------

![enter description here][1]


“spread”改变阴影的大小——其值可以是正负值，如果值为正，则整个阴影都延展扩大，反之值为负值是，则缩小。有了这个参数后，我们也可以使用“box-shadow”像photoshop中的阴影工作一样，制作单边阴影效果：


```
		.box1 {
			box-shadow: -5px 0 5px green, /*左边阴影*/
			0 -5px 5px blue, /*顶部阴影*/
			0 5px 5px red, /*底部阴影*/
			5px 0 5px yellow; /*右边阴影*/

		}
		
		.box2 {
			box-shadow: -5px 0 5px -5px green, /*左边阴影*/
			0 -5px 5px -5px blue, /*顶部阴影*/
			0 5px 5px -5px red, /*底部阴影*/
			5px 0 5px -5px yellow; /*右边阴影*/
		}
```


![enter description here][2]



**这里需要注意一点，这个扩展阴影值需要和阴影模糊半径配合使用，一般情况是“扩展阴影半径一般设置为和糊模半径大小，并取其负值。”**


### 层叠效果
```
 box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
```

更多效果
https://conceptboard.github.io/box-shadow-spread-examples/

## 总结
“CSS3 box-shadow不仅仅只有【投景方式：外阴影或内阴影】、【X轴偏移量：x-offset】、【Y轴偏移量：y-offset】、【阴影模糊半径：blur-radius】和【阴影颜色：color】，它还有一个常被我们遗忘的另外一个值——【阴影扩展半径：spread-radius】。我们可以通过【spread-radius扩展半径】来控制阴影的扩展方向：扩展半径有两个值，如果取值为正值，则个阴影会向外扩展，如果你给其取负值，整个阴影向内缩小。如此可以通个这个值配合阴影的模糊半径来制作单边的不同阴影效果，而且不会影响其他边的效果。或者换句简单的点，可以使用他制作单边投影效果。”

















  [1]: http://www.w3cplus.com/sites/default/files/box-shadow-spread-1.png
  [2]: http://www.w3cplus.com/sites/default/files/box-shadow-spread-2.png