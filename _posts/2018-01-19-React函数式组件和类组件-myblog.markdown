---
layout:     post
title:      "React中函数式组件和类组件"
date:       2018-01-19 15:08:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文

[网页链接](http://www.css88.com/react/docs/components-and-props.html)


最简单的定义组件的方法是写一个 JavaScript 函数:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

```

这个函数是一个有效的 React 组件，因为它接收一个 props 参数, 并返回一个 React 元素。 我们把此类组件称为”函数式(Functional)“组件， 因为从字面上看来它就是一个 JavaScript 函数。

你也可以用一个 ES6 的 class 来定义一个组件:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上面两个组件从 React 的角度来看是等效的。



>Props ， 即属性(Property)， 在代码中写作 props ， 故可用 props 指代 properties 
以下代码在页面上渲染 “Hello, Sara” ：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

###  警告：

组件名称总是以大写字母开始。

举例来说, `<div />` 代表一个 DOM 标签，而 `<Welcome />` 则代表一个组件，并且需要在作用域中有一个 Welcome 组件。


### Props 是只读的

无论你用函数或类的方法来声明组件, 它都无法修改其自身 props. 

```
function sum(a, b) {
  return a + b;
}
```
这种函数称为 “纯函数” ，因为它们不会试图改变它们的输入，并且对于同样的输入,始终可以得到相同的结果。


反之， 以下是非纯函数， 因为它改变了自身的输入值：
```
function withdraw(account, amount) {
  account.total -= amount;
}
```

虽然 React 很灵活，但是它有一条严格的规则：
**所有 React 组件都必须是纯函数，并禁止修改其自身 props 。**


### 把函数式组件转化为类组件
```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```
你可以遵从以下5步, 把一个类似 Clock 这样的函数式组件转化为类组件：


1. 创建一个继承自 React.Component 类的 ES6 class 同名类。
2. 添加一个名为 render() 的空方法。
3. 把原函数中的所有内容移至 render() 中。
4. 在 render() 方法中使用 this.props 替代 props。
5. 删除保留的空函数声明。

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Clock 现在被定为类组件，而不是函数式组件。

类允许我们在其中添加本地状态(state)和生命周期钩子。

### 在类组件中添加本地状态(state)

我们现在通过以下3步, 把date从属性(props) 改为 状态(state)：

替换 render() 方法中的 this.props.date 为 this.state.date：
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
添加一个 类构造函数(class constructor) 初始化 this.state:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 在类中添加生命周期方法
在一个具有许多组件的应用程序中，在组件被销毁时释放所占用的资源是非常重要的。

当 Clock 第一次渲染到DOM时，我们要设置一个定时器 。 这在 React 中称为 “挂载(mounting)” 。

当 Clock 产生的 DOM 被销毁时，我们也想清除该计时器。 这在 React 中称为 “卸载(unmounting)” 。

当组件挂载和卸载时，我们可以在组件类上声明特殊的方法来运行一些代码：
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法称为 “生命周期钩子”。

componentDidMount() 钩子在组件输出被渲染到 DOM 之后运行。这是设置时钟的不错的位置：
```
 componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

>注意我们把计时器ID直接存在 this 中。


this.props 由 React 本身设定, 而 this.state 具有特殊的含义，但如果需要存储一些不用于视觉输出的内容，则可以手动向类中添加额外的字段。

如果在 render() 方法中没有被引用, 它不应该出现在 state 中。

我们在componentWillUnmount()生命周期钩子中取消这个计时器：
```
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

最后，我们将会实现每秒运行的 tick() 方法。

它将使用 this.setState() 来来周期性地更新组件本地状态：
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### 正确地使用 State(状态)
关于 setState() 有三件事是你应该知道的。

#### 不要直接修改 state(状态)
这样将不会重新渲染一个组件：
```
// 错误
this.state.comment = 'Hello';
```
用 setState() 代替：

```
// 正确
this.setState({comment: 'Hello'});
```
唯一可以分配 this.state 的地方是构造函数。

#### state(状态) 更新可能是异步的

React 为了优化性能，有可能会将多个 setState() 调用合并为一次更新。

因为 this.props 和 this.state 可能是异步更新的，你不能依赖他们的值计算下一个state(状态)。

例如, 以下代码可能导致 counter(计数器)更新失败：
```
// 错误
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要弥补这个问题，使用另一种 setState() 的形式，它接受一个函数而不是一个对象。这个函数将接收前一个状态作为第一个参数，应用更新时的 props 作为第二个参数：
```
// 正确
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```


#### state(状态)更新会被合并
当你调用 setState()， React 将合并你提供的对象到当前的状态中。

例如，你的状态可能包含几个独立的变量：
```
 constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
然后通过调用独立的 setState() 调用分别更新它们:
```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

>**但是合并是浅合并**

### 数据向下流动

无论作为父组件还是子组件，它都无法获悉一个组件是否有状态，同时也不需要关心另一个组件是定义为函数组件还是类组件。

这就是 state(状态) 经常被称为 本地状态 或 封装状态的原因。 它不能被拥有并设置它的组件 以外的任何组件访问。

一个组件可以选择将 state(状态) 向下传递，作为其子组件的 props(属性)：
`<h2>It is {this.state.date.toLocaleTimeString()}.</h2>`

同样适用于用户定义组件:
`<FormattedDate date={this.state.date} />`

FormattedDate 组件通过 props(属性) 接收了 date 的值
```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
