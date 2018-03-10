---
layout:     post
title:      "react中的bind(this)"
date:       2018-03-10 20:27:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.css88.com/react/docs/handling-events.html)


在React Component中为什么需要bind(this)?

**因为在class中声明函数，并不会自动绑定this对象(重点就是这里)**
在`onClick={this.handleEvent}`的时候，分解成两步：


```
let handleEvent = this.handleEvent;
...onClick={handleEvent}...
```

所以，onClick调用的时候，handleEvent中的this会是undefined（根据文档）
所以，你需要bind一下, 那么里面的this就是当前组件啦。




----------


```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

在JSX回调中你必须注意 this 的指向。 在 JavaScript 中，类方法默认没有 绑定的。如果你忘记绑定 this.handleClick 并将其传递给onClick，那么在直接调用该函数时，this 会是 undefined 。

这不是 React 特有的行为；这是 JavaScript 中的函数如何工作的一部分。 一般情况下，如果你引用一个后面没跟 () 的方法，例如 onClick={this.handleClick} ，那你就应该 绑定(bind) 该方法。

如果调用 bind 令你烦恼，有两种方法可以解决这个问题。 如果您使用实验性的 属性初始化语法 ，那么你可以使用属性初始值设置来正确地 绑定(bind) 回调：

```
class LoggingButton extends React.Component {
  // 这个语法确保 `this` 绑定在 handleClick 中。
  // 警告：这是 *实验性的* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

这个语法在 创建 React App 中是默认开启的。

如果你没有使用属性初始化语法，可以在回调中使用一个 箭头函数：
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 这个语法确保 `this` 被绑定在 handleClick 中
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```


这个语法的问题是，每次 LoggingButton 渲染时都创建一个不同的回调。在多数情况下，没什么问题。然而，如果这个回调被作为 prop(属性) 传递给下级组件，这些组件可能需要额外的重复渲染。**我们通常建议在构造函数中进行绑定，以避免这类性能问题。**




















