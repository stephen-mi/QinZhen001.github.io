---
layout:     post
title:      "transition-group"
date:       2017-08-16 20:11:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://cn.vuejs.org/v2/api/#transition-group)


Props：
tag - string, 默认为 span
move-class - 覆盖移动过渡期间应用的 CSS 类。
除了 mode，其他特性和 <transition> 相同。

事件和 `<transition>` 相同.

用法：
`<transition-group>` 元素作为多个元素/组件的过渡效果。`<transition-group>` 渲染一个真实的 DOM 元素。默认渲染`<span>`，可以通过 tag 属性配置哪个元素应该被渲染。

注意，每个 `<transition-group>` 的子节点必须有 独立的key ，动画才能正常工作

`<transition-group>` 支持通过 CSS transform 过渡移动。当一个子节点被更新，从屏幕上的位置发生变化，它将会获取应用 CSS 移动类（通过 name 属性或配置 move-class 属性自动生成）。如果 CSS transform 属性是“可过渡”属性，当应用移动类时，将会使用 FLIP 技术 使元素流畅地到达动画终点。
```
<transition-group tag="ul" name="slide">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</transition-group>
```

## transition
Props：
name - string, 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v"
appear - boolean, 是否在初始渲染时使用过渡。默认为 false。
css - boolean, 是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
type - string, 指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
mode - string, 控制离开/进入的过渡时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时生效。
enter-class - string
leave-class - string
appear-class - string
enter-to-class - string
leave-to-class - string
appear-to-class - string
enter-active-class - string
leave-active-class - string
appear-active-class - string

### 事件：
before-enter
before-leave
before-appear
enter
leave
appear
after-enter
after-leave
after-appear
enter-cancelled
leave-cancelled (v-show only)
appear-cancelled

### 用法：
`<transition>` 元素作为单个元素/组件的过渡效果。`<transition>` 不会渲染额外的 DOM 元素，也不会出现在检测过的组件层级中。它只是将内容包裹在其中，简单的运用过渡行为。
```
<!-- 简单元素 -->
<transition>
  <div v-if="ok">toggled content</div>
</transition>
<!-- 动态组件 -->
<transition name="fade" mode="out-in" appear>
  <component :is="view"></component>
</transition>
<!-- 事件钩子 -->
<div id="transition-demo">
  <transition @after-enter="transitionComplete">
    <div v-show="ok">toggled content</div>
  </transition>
</div>
new Vue({
  ...
  methods: {
    transitionComplete: function (el) {
      // 传入 'el' 这个 DOM 元素作为参数。
    }
  }
  ...
}).$mount('#transition-demo')
```
