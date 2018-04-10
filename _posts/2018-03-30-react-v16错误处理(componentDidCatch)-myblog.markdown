---
layout:     post
title:      "react-v16错误处理(componentDidCatch)"
date:       2018-03-30 23:39:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000011379425)

React 早就需要一个处理错误的解决方案。
在 React V15 中使用 handle_unstableError

从早期的 React 开发以来，一个小的组件抛出错误将会破坏整个应用程序，这种情况相当普遍。

React 16 将提供一个内置函数 componentDidCatch，如果 render() 函数抛出错误，则会触发该函数。在下面的示例中，你可以点击 “button will throw” 来抛出一个错误。

[https://codesandbox.io/s/lOo5AV12M](https://codesandbox.io/s/lOo5AV12M)



```
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }


    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
         return this.state.hasError?出错的情况:正常情况
    }

}    
```

>把componentDidCatch放在App.js中就可以处理全局错误了




### 重要提示
**错误在渲染阶段中被捕获，但在事件处理程序中不会被捕获。**


下面是一个基本的 PotentialError 组件
```
class PotentialError extends React.Component {   
  constructor(props) {     
    super(props);     
    this.state = { error: false };
  }
  componentDidCatch(error, info) {     
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return <h1>Error: {this.state.error.toString()}</h1>;
    }
    return this.props.children;   
  } 
}
```
然后在顶部或任何地方，你可以这样使用它：
```
<PotentialError><AwesomeApp /></PotentialError>
```


另一个令人敬畏的特性 componentDidCatch 是包含错误堆栈的 info 对象！
```
{this.state.info && this.state.info.componentStack}
```

这将告诉你组件在哪里失效！
让我知道你正在使用错误边界！





## 补充

### 错误边界介绍
[https://zhuanlan.zhihu.com/p/29706036](https://zhuanlan.zhihu.com/p/29706036)
在 UI 部分发生的 JavaScript 异常不应该阻断整个应用。为了解决这一问题，React 16 引入了“错误边界（error boundary）”这一新概念。

错误边界作为 React 组件，用以**捕获在子组件树中任何地方的 JavaScript 异常，打印这些错误，并展示备用 UI 而非让组件树崩溃**。错误边界会捕获渲染期间，在生命周期方法中以及在其整个树的构造函数中的异常。



**错误边界仅可以捕获组件树中的后代组件错误。**
一个错误边界无法捕获其自身的错误。若错误边界在渲染错误信息时失败，则该错误会传递至上一层最接近的错误边界。而这也类似与 JavaScript 中的 catch {} 块的工作方式。



















    