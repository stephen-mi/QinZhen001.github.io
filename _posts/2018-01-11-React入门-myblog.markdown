---
layout:     post
title:      "React入门"
date:       2018-01-07 13:59:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 基础
[https://doc.react-china.org/](https://doc.react-china.org/)

这里只写一些比较重要的基础知识，查看更多知识请移步react官网



### this.props.children
this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children

```
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取，运行结果如下。

![enter description here][1]

**这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。**


React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

[https://reactjs.org/docs/react-api.html#react.children](https://reactjs.org/docs/react-api.html#react.children)

`React.Children.map(children, function[(thisArg)])`

上调用包含在每一个直系子的功能children与this设置为thisArg。如果children是键控片段或数组，它将被遍历：该函数永远不会传递容器对象。如果孩子null或undefined返回null或undefined而不是一个数组。


使用方法：
```
React.Children.map(this.props.children, function (child) {
    return <li>{child}</li>;
})
```


`React.Children.forEach(children, function[(thisArg)])`



### 获取真实的DOM节点
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性
```
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```
上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。


需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。


### 表单
用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取


```
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```

上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况


### Ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用 componentDidMount 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI

```
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```


上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库。



### React中constructor(props){}

在React Class中设置state的初始值或者绑定事件时
为什么在constructor(){} 中加上super()
如果去掉super()会怎样呢！
```
    constructor() {  
      this.state = {searchStr: ''};  
      this.handleChange = this.handleChange.bind(this);  
    }  
```
运行这段代码时，会发现编译错误：

提示没有在this之前加上super()
其实就是少了super()，导致了this的 Reference Error

```
    class MyComponent extends React.Component {  
      constructor() {  
        console.log(this); // Reference Error  
      }  
      
      render() {  
        return <div>Hello {this.props.name}</div>;  
      }  
    }  
```


----------

```
    constructor() {  
      super();  
      this.state = {searchStr: ''};  
      this.handleChange = this.handleChange.bind(this);  
    }  
```
那么React的官方例子中都是加上了props作为参数
```
    constructor(props) {  
      super(props);  
      this.state = {searchStr: ''};  
      this.handleChange = this.handleChange.bind(this);  
    }  
```



那它们的区别在哪儿呢
What's the difference between “super()” and “super(props)” in React when using es6 classes?
借用下stackoverflow上的解释

There is only one reason when one needs to pass props to super():
When you want to access this.props in constructor.
(Which is probably redundant since you already have a reference to it.)


**只有一个理由需要传递props作为super()的参数，那就是你需要在构造函数内使用this.props**
那官方提供学习的例子中都是写成super(props)，所以说写成super(props)是完全没问题的，也建议就直接这样写


### reducer为什么叫reducer
我们注意到redux的官方文档里专门有一句对reducer命名的解释：

It's called a reducer because it's the type of function you would pass to Array.prototype.reduce(reducer, ?initialValue)

中文版的文档把这一句话翻译成了：

之所以称作 reducer 是因为它将被传递给 Array.prototype.reduce(reducer, ?initialValue) 方法

我们要注意到这里的中文翻译理解其实是错误的。原文的本意并不是说redux里的reducer会被传入到 Array.prototype.reduce 这个方法中。真的要翻译的话，应该翻译为：

**之所以将这样的函数称之为reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer, ?initialValue) 的回调函数属于相同的类型。**

为什么这么讲呢？我们来看一下array使用reduce方法的具体例子：
```
// 以下代码示例来自 MDN JavaScript 文档

/* 这里的callback是和reducer非常相似的函数
 * arr.reduce(callback, [initialValue])
 */

var sum = [0, 1, 2, 3].reduce(function(acc, val) {
  return acc + val;
}, 0);
// sum = 6

/* 注意这当中的回调函数 (prev, curr) => prev + curr
 * 与我们redux当中的reducer模型 (previousState, action) => newState 看起来是不是非常相似呢
 */
[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr );
```


为了进一步加深理解，我们再了解一下reduce是什么东西，这个名词其实是函数式编程当中的一个术语，在更多的情况下，reduce操作被称为Fold折叠（下图来自维基百科）。



![enter description here][2]


直观起见，我们还是拿JavaScript来理解。reduce属于一种高阶函数，它将其中的回调函数reducer递归应用到数组的所有元素上并返回一个独立的值。这也就是“缩减”或“折叠”的意义所在了。


**总而言之一句话，redux当中的reducer之所以叫做reducer，是因为它和 Array.prototype.reduce 当中传入的回调函数非常相似。**



### JSX 中的 If-Else
你没法在JSX中使用 if-else 语句，因为 JSX 只是函数调用和对象创建的语法糖。看下面这个例子：

```
// This JSX:
<div id={if (condition) { 'msg' }}>Hello World!</div>

// Is transformed to this JS:
React.createElement("div", {id: if (condition) { 'msg' }}, "Hello World!");
```

这是不合语法的 JS 代码。不过你可以采用三元操作表达式：
```
React.render(<div id={condition ? 'msg' : ''}>Hello World!</div>, mountNode);
```


当三元操作表达式不够健壮，你也可以使用 if 语句来决定应该渲染那个组件。
```
var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
)
```





### JSX 根节点的最大数量
目前， 一个 component 的 render，只能返回一个节点。如果你需要返回一堆 div ， 那你必须将你的组件用 一个div 或 span 或任何其他的组件包裹。

切记，JSX 会被编译成常规的 JS； 因此返回两个函数也就没什么意义了，同样地，千万不要在三元操作符中放入超过一个子节点。


### Container Component模式
一个container负责数据的获取，然后渲染它对应的下级component。就这些而已。

“对应的”的意思是他们拥有共同的名称：

StockWidgetContainer => StockWidget
TagCloudContainer => TagCloud
PartyPooperListContainer => PartyPooperList

为什么要用Containers呢？

假设我们需要做一个展示评论的组建。在你不知道container components模式之前，你会把所有的东西都放在一个里面：
```
// CommentList.js
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <ul> {this.state.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}
```
你的这个组建要同时负责获取数据和展示数据。当然，这种做法没有什么错的，但是你没有很好的利用React的一些优势。

复用性
除非在一个一模一样的使用环境下，你无法重用CommentList组建。


数据结构
你的展示组建对需要的数据架构有具体的要求，而PropTypes能够很好地满足这个要求。
展示组建对数据结构有一定的要求，但是却没有办法限制数据类型。如果传入的json结构发生了改变，那么组建就会down掉，并不会抛出任何错误。


如果我们使用container
```
// CommentListContainer.js
class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: "/my-comments.json",
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```
同时，我们修改一下CommentList让它可以接受一个comments的prop。
```
// CommentList.js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return <ul> {this.props.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}
```


所以，我们这么做获得了什么？

我们获取了很多东西…
我们分离了数据获取和数据渲染的逻辑。
我们让CommentList变成了可复用的组建。
我们允许CommentList可以通过PropTypes来限制props数据个格式。如果props格式出错，就会报错。


  [1]: http://www.ruanyifeng.com/blogimg/asset/2015/bg2015033110.png
  [2]: https://pic1.zhimg.com/80/v2-a32cb02859ea4ac0f8f50f1ec885d85c_hd.jpg