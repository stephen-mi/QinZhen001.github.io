---
layout:     post
title:      "react-router中IndexRoute和IndexRedirect"
date:       2018-03-14 21:35:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.mycode.net.cn/language/javascript/2198.html)

### IndexRoute
通常情况下，我们会建立如下情况的路由：
```
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
其中 App 组件一般情况下是一个 layout，比如包含了 header、footer 或者其他内容，其下面的 route 会被嵌入到这个 App 中（它们将成为 App 的
children），但这样配置路由有一个问题，就是我们访问 http://localhost:3000/ 这个地址时，你会发现仅渲染了一个 App 的 layout 内容，Accounts 和 Statements 都没有被渲染，这种情况下我们一般会设置一个默认页，当访问 / 这个路由时显示这个默认页。由此就需要用到 IndexRoute 功能，修改一下路由如下所示：
```
<Router>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
如此配置后，我们再次访问 / 路由，你会发现页面渲染了 Home 组件的内容。这就是 IndexRoute 的功能，指定一个路由的默认页。





### IndexRedirect

上面这种情况比较常见，还有一种非常常见的方式就是当我们尝试访问 / 这个路由时，我们想让其直接跳转到 ‘/Accounts’，直接免去了默认页 Home，这样来的更加直接。由此我们就需要 IndexRedirect 功能。考虑如下路由：
```
<Router>
  <Route path="/" component={App}>
    <IndexRedirect to="/accounts"/>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```
这样设计路由后，我们再次访问 / 时，系统默认会跳转到 /accounts 路由。

## 总结
以上就是 IndexRoute 和 IndexRedirect 的功能介绍，让我们来总结一下他们两个的区别。

* IndexRoute 一般情况下用于设计一个默认页且不改变 URL 地址，而 IndexRedirect 则是跳转默认地址且地址会发生改变。
* IndexRoute 指定一个组件作为默认页，而 IndexRedirect 指定一个路由地址作为跳转地址。























