---
layout:     post
title:      "vue中$nextTick"
date:       2018-04-07 11:09:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://github.com/answershuto/learnVue/blob/master/docs/Vue.js%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0DOM%E7%AD%96%E7%95%A5%E5%8F%8AnextTick.MarkDown)


[https://cn.vuejs.org/v2/api/#vm-nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)



### 异步更新视图
来看一下下面这一段代码
```
<template>
  <div>
    <div>{{test}}</div>
  </div>
</template>
export default {
    data () {
        return {
            test: 0
        };
    },
    mounted () {
      for(let i = 0; i < 1000; i++) {
        this.test++;
      }
    }
}
```

现在有这样的一种情况，mounted的时候test的值会被++循环执行1000次。 每次++时，都会根据响应式触发setter->Dep->Watcher->update->patch。 如果这时候没有异步更新视图，那么每次++都会直接操作DOM更新视图，这是非常消耗性能的。 所以Vue.js实现了一个queue队列，在下一个tick的时候会统一执行queue中Watcher的run。同时，拥有相同id的Watcher不会被重复加入到该queue中去，所以不会执行1000次Watcher的run。最终更新视图只会直接将test对应的DOM的0变成1000。 保证更新视图操作DOM的动作是在当前栈执行完以后下一个tick的时候调用，大大优化了性能。



### 访问真实DOM节点更新后的数据
所以我们需要在修改data中的数据后访问真实的DOM节点更新后的数据，只需要这样
```
<template>
  <div>
    <div ref="test">{{test}}</div>
    <button @click="handleClick">tet</button>
  </div>
</template>
export default {
    data () {
        return {
            test: 'begin'
        };
    },
    methods () {
        handleClick () {
            this.test = 'end';
            this.$nextTick(() => {
                console.log(this.$refs.test.innerText);//打印"end"
            });
            console.log(this.$refs.test.innerText);//打印“begin”
        }
    }
}
```



使用Vue.js的global API的$nextTick方法，即可在回调中获取已经更新好的DOM实例了。



参数：
{Function} [callback]

用法：
**将回调延迟到下次 DOM 更新循环之后执行**。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。






>2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不是原生支持 Promise (IE：你们都看我干嘛)，你得自行 polyfill。



















