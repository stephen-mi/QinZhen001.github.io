---
layout:     post
title:      "React中context上下文"
date:       2018-01-30 22:13:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.css88.com/react/docs/context.html)

在 React 中，通过你的 React 组件很容易追踪数据流。但你察看一个组件时，你可以找出哪些属性(props)被传递，这使得你的应用非常容易理解。

在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的”context” API解决上述问题。

### 不要轻易使用Context

绝大多数的应用程序不需要使用上下文(context)。

如果你希望使用应用程序更加稳定，就不要使用上下文(context)。这只是一个实验性的 API ，并且可能在未来的 React 版本中移除。

如果你不熟悉 Redux 或者 MobX 这类 state 管理库，就不要使用 context 。在许多实际应用中，这些库以及和React 绑定是一个很好的管理 和许多组件相关的 state 。Redux 相比 context 是更好的解决方案。

如果你不是一个经验丰富的 React 开发者，就不要使用 context 。更好的方式是使用 props 和 state 。

如果你不顾这些警告仍然坚持使用 context ，尝试着将 context 的使用隔离在一个将小的范围内，并且在可能的情况下直接使用 context ，以便在API改变的时候进行升级。


### 如何使用Context
假定你有下面的结构:
```
class Button extends React.Component {
  render() {
    return (
      <button style={{'{{'}}background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Message text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```
在这个例子中，我们手动地传递 color prop(属性)使得 Button 和 Message 设置正确的样式。使用 context ，我们可以自动在组件树中传递。

```
const PropTypes = require('prop-types');

class Button extends React.Component {
  render() {
    return (
      <button style={{'{{'}}background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```

通过将 childContextTypes 和 getChildContext 添加到 MessageList ( context 提供者)，React 自动地向下传递信息，并且子树中的任何组件（这个例子中的Button）都可以通过定义 contextTypes 去访问它。


如果 contextTypes 没有定义， context 将是一个空对象


>注意： 从 React v15.5 开始 ，React.PropTypes 助手函数已被弃用，我们建议使用 prop-types 库 来定义contextTypes。

### 父子耦合
Context 可以构建 API 使得父组件和子组件进行相互通信。例如， React Router V4 就是使用这种方式的一个库：
```
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);
```

从 Router 组件向下传递一些信息，每一个 Link 和 Route 都可以沟通回到到包含容器 Router。

在你使用类似的 API 构建组件之前，考虑是否有一个更加的替代方案。例如，如果你喜欢你可以将整个 React 组件作为props 传入。

### **在生命周期方法中引用 Context**

如果 contextTypes 在组件中定义，下列的生命周期方法将接受一个额外的参数， context 对象：
* constructor(props, context)
* componentWillReceiveProps(nextProps, nextContext)
* shouldComponentUpdate(nextProps, nextState, nextContext)
* componentWillUpdate(nextProps, nextState, nextContext)
* componentDidUpdate(prevProps, prevState, prevContext)

>注意：从 React 16 开始， componentDidUpdate 不再接收 prevContext 。



### 在无状态的函数式组件中引用 Context
无状态的函数式组件也可以引用 context , 如果 contextTypes 作为函数的属性被定义。下面代码展示一个无状态的函数式 Button 组件
```
const PropTypes = require('prop-types');

const Button = ({children}, context) =>
  <button style={{'{{'}}background: context.color}}>
    {children}
  </button>;

Button.contextTypes = {color: PropTypes.string};
```


### 更新 Context

别这么做！

React 有一个 API 更新

context，但是它打破了基本流程，不应该使用。

