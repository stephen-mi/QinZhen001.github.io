---
layout:     post
title:      "React Router 4.0"
date:       2018-01-15 13:00:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文

[api中文文档](http://reacttraining.cn/web/example/basic)

[初探 React Router 4.0](https://www.jianshu.com/p/e3adc9b5f75c)


RR4 本次采用单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包，分别是：

* react-router React Router 核心
* react-router-dom 用于 DOM 绑定的 React Router
* react-router-native 用于 React Native 的 React Router
* react-router-redux React Router 和 Redux 的集成
* react-router-config 静态路由配置的小助手


### react-router 还是 react-router-dom？
在 React 的使用中，我们一般要引入两个包，react 和 react-dom，那么 react-router 和 react-router-dom 是不是两个都要引用呢？
非也，坑就在这里。他们两个只要引用一个就行了，不同之处就是后者比前者多出了 `<Link>` `<BrowserRouter>` 这样的 DOM 类组件。
因此我们**只需引用 react-router-dom 这个包**就行了。当然，如果搭配 redux ，你还需要使用 react-router-redux。

### 组件
`<BrowserRouter>`

一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。此组件拥有以下属性：

**basename: string**
作用：为所有位置添加一个基准URL
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。

```
<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```

**getUserConfirmation: func**
作用：导航到此页面前执行的函数，默认使用 window.confirm
使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。


**forceRefresh: bool**
作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
使用场景：同上。

```
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```

**keyLength: number**
作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
使用场景：按需设置。
`<BrowserRouter keyLength={12} />`


**children: node**
作用：渲染唯一子元素。
使用场景：作为一个 Reac t组件，天生自带 children 属性。



### `<Route>`
<Route> 也许是 RR4 中最重要的组件了，重要到你必须理解它，学会它，用好它。它最基本的职责就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面。

`<Route>` 自带三个 render method 和三个 props 。

render methods 分别是：
* `<Route component>`
* `<Route render>`
* `<Route children>`

每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component 。

props 分别是：
* match
* location
* history

所有的 render method 无一例外都将被传入这些 props。

#### component

只有当访问地址和路由匹配时，一个 React component 才会被渲染，此时此组件接受 route props (match, location, history)。
当使用 component 时，router 将使用 React.createElement 根据给定的 component 创建一个新的 React 元素。这意味着如果你使用内联函数（inline function）传值给 component 将会产生不必要的重复装载。对于内联渲染（inline rendering）, 建议使用 render prop。

```
<Route path="/user/:username" component={User} />
const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```

#### render: func
此方法适用于内联渲染，而且不会产生上文说的重复装载问题。
```
// 内联渲染
<Route path="/home" render={() => <h1>Home</h1} />

// 包装 组合
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props} />
    </FaseIn>
  )} />
)

<FadingRoute path="/cool" component={Something} />
```

作者：_minooo_
链接：https://www.jianshu.com/p/e3adc9b5f75c
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

