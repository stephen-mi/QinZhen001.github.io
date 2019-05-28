---
layout:     post
title:      "Jquery中动画animate"
date:       2017-10-29 22:52:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Jquery
---

> “Yeah It's on. ”


## 正文
 
[网页链接](http://www.imooc.com/code/10177)

有些复杂的动画通过之前学到的几个动画函数是不能够实现，这时候就需要强大的animate方法了

操作一个元素执行3秒的淡入动画，对比一下2组动画设置的区别

```javascript
$(elem).fadeOut(3000)  
$(elem).animate({   
    opacity:0
},3000)
```

显而易见，animate方法更加灵活了，可以精确的控制样式属性从而执行动画

### 语法：
.animate( properties ,[ duration ], [ easing ], [ complete ] )
.animate( properties, options )

.animate()方法允许我们在任意的数值的CSS属性上创建动画。2种语法使用，几乎差不多了，唯一必要的属性就是一组CSS属性键值对。这组属性和用于设置.css()方法的属性键值对类似，除了属性范围做了更多限制。第二个参数开始可以单独传递多个实参也可以合并成一个对象传递了

.animate()方法允许我们在任意的数值的CSS属性上创建动画。2种语法使用，几乎差不多了，唯一必要的属性就是一组CSS属性键值对。这组属性和用于设置.css()方法的属性键值对类似，除了属性范围做了更多限制。第二个参数开始可以单独传递多个实参也可以合并成一个对象传递了

### 参数分解：

properties：一个或多个css属性的键值对所构成的Object对象。要特别注意所有用于动画的属性必须是数字的，除非另有说明；这些属性如果不是数字的将不能使用基本的jQuery功能。比如常见的，border、margin、padding、width、height、font、left、top、right、bottom、wordSpacing等等这些都是能产生动画效果的。background-color很明显不可以，因为参数是red或者GBG这样的值，非常用插件，否则正常情况下是不能只用动画效果的。注意，CSS 样式使用 DOM 名称（比如 "fontSize"）来设置，而非 CSS 名称（比如 "font-size"）。

特别注意单位，属性值的单位像素（px）,除非另有说明。单位em 和 %需要指定使用

```javascript
.animate({
    left: 50, 
    width: '50px'   
    opacity: 'show',  
    fontSize: "10em",
}, 500);
```

除了定义数值，每个属性能使用'show', 'hide', 和 'toggle'。这些快捷方式允许定制隐藏和显示动画用来控制元素的显示或隐藏
```javascript
.animate({
    width: "toggle"
});
```

如果提供一个以+= 或 -=开始的值，那么目标值就是以这个属性的当前值加上或者减去给定的数字来计算的

```javascript
.animate({ 
    left: '+=50px'
}, "slow");
```

#### duration时间

动画执行的时间，持续时间是以毫秒为单位的；值越大表示动画执行的越慢，不是越快。还可以提供'fast' 和 'slow'字符串，分别表示持续时间为200 和 600毫秒。


#### easing动画运动的算法
jQuery库中默认调用 swing。如果需要其他的动画算法，请查找相关的插件

#### complete回调
动画完成时执行的函数，这个可以保证当前动画确定完成后发会触发

### 例子
```html
    <h2>animate(上)</h2>
    <p>慕课网,专注分享</p>
    <div id="aaron">内部动画</div>
    点击观察动画效果：
    <select id="animation">
        <option value="1">动画1</option>
        <option value="2">动画2</option>
        <option value="3">动画3</option>
        <option value="4">动画4</option>
    </select>
    <input id="exec" type="button" value="执行动画">
```

```javascript
  <script type="text/javascript">
    $("#exec").click(function() {
        var v = $("#animation").val();
        var $aaron = $("#aaron");
        if (v == "1") {
            // 数值的单位默认是px
            $aaron.animate({
                width  :300,
                height :300
            });
        } else if (v == "2") {
            // 在现有高度的基础上增加100px
            $aaron.animate({
                 width  : "+=100px",
                 height : "+=100px"
            });
        } else if (v == "3") {
            $aaron.animate({
                fontSize: "5em"
            }, 2000, function() {
                alert("动画 fontSize执行完毕!");
            });
        } else if (v == "4") {
            //通过toggle参数切换高度
            $aaron.animate({
                width: "toggle"
            });
        } 
    });
    </script>
```


----------


### .animate( properties, options )
animate在执行动画中，如果需要观察动画的一些执行情况，或者在动画进行中的某一时刻进行一些其他处理，我们可以通过animate提供的第二种设置语法，传递一个对象参数，可以拿到动画执行状态一些通知

### options参数

* duration - 设置动画执行的时间
* easing - 规定要使用的 easing 函数，过渡使用哪种缓动函数
* step：规定每个动画的每一步完成之后要执行的函数
* progress：每一次动画调用的时候会执行这个回调，就是一个进度的概念
* complete：动画完成回调

**如果多个元素执行动画，回调将在每个匹配的元素上执行一次，不是作为整个动画执行一次**

```javascript
$('#elem').animate({
    width: 'toggle',  
    height: 'toggle'
  }, {
    duration: 5000,
    specialEasing: {
      width: 'linear',
      height: 'easeOutBounce'
    },
    complete: function() {
      $(this).after('<div>Animation complete.</div>');
    }
  });
```



```javascript
 <script type="text/javascript">
    $("#exec").click(function() {
        var v = $("#animation").val();
        var $aaron = $("#aaron");
        if (v == "1") {
            //观察每一次动画的改变
            $aaron.animate({
                height: '50'
            }, {
                duration :2000,
                //每一个动画都会调用
                step: function(now, fx) {
                   $aaron.text('高度的改变值:'+now)
                }
            })
        } else if (v == "2") {
            //观察每一次进度的变化
            $aaron.animate({
                height: '50'
            }, {
                duration :2000,
                //每一步动画完成后调用的一个函数，
                //无论动画属性有多少，每个动画元素都执行单独的函数
                progress: function(now, fx) {
                   $aaron.text('进度:'+arguments[1])
        
                }
            })
        } 
    });
    </script>
```

### 停止动画stop

#### 语法：
.stop( [clearQueue ], [ jumpToEnd ] )
.stop( [queue ], [ clearQueue ] ,[ jumpToEnd ] )


stop还有几个可选的参数，简单来说可以这3种情况

* .stop(); 停止当前动画，点击在暂停处继续开始。 **停止当前动画**
* .stop(true); 如果同一元素调用多个动画方法，尚未被执行的动画被放置在元素的效果队列中。这些动画不会开始，直到第一个完成。当调用.stop()的时候，队列中的下一个动画立即开始。如果clearQueue参数提供true值,那么在队列中的动画其余被删除并永远不会运行。 **真正的停止,当前动画停止,队列里后续动画也不执行**
* .stop(true,true); 当前动画将停止，但该元素上的 CSS 属性会被立刻修改成动画的目标值。
**当前动画动作停止，并且直接展示所有动画完成后的最终状态**



