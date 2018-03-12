---
layout:     post
title:      "react中this.setState"
date:       2018-03-11 16:42:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[setState这个API的设计](https://zhuanlan.zhihu.com/p/25954470)


### this.setState后获取最新数据

this.setState是异步，所以在this.setState之后立即调用this.state是获取不到最新的数据的，那么怎么获取最新的数据呢？下面介绍三个方法：

1.回调函数callback
```
this.setState({
  val: this.state.val+1
}, () => {
  console.log(this.state.val)
});
```
2.componentDidUpdate
```
componentDidUpdate(){
    console.log(this.state.val);
}
```
在this.setState之后去componentDidUpdate函数中调用，此时的this.state已经更新

3.将this.setState放入setTimeout函数中
```
let self = this;
setTimeout(function () {
  self.setState({
    val:self.state.val+1
  });
  console.log(self.state.val);
})
```
在setTimeout函数中，在this.setState之后this.state是立即更新的，所以也可以获取到更新后的数据。


### setState这个API的设计

React抽象来说，就是一个公式

`UI=f(state)`
我们把最终绘制出来的UI当做一个函数f运行的结果，f就是React和我们基于React写得代码，而f的输入参数就是state。

作为React管理state的一个重要方法，setState肯定非常重要，如果只是简单用法，也不会有任何问题，但是如果用得深，就会发现很……尴尬。

我刚开始接触React的时候，就意识到React相当于一个jQuery的替代品，但是就像单独依靠jQuery难以管理大型项目，所以也需要给配合使用的MVC框架找一个替代品，我选择的替代品是Redux，我很早就将React和Redux配合使用；现在，回过头来看看React的setState，发现坑真的不少，不禁感叹自己还是挺走运的。

对setState用得深了，就容易犯错，所以我们开门见山先把理解setState的关键点列出来。

* setState不会立刻改变React组件中state的值；
* setState通过引发一次组件的更新过程来引发重新绘制；
* 多次setState函数调用产生的效果会合并。


#### setState不会立刻改变React组件中state的值
在React中，一个组件中要读取当前状态用是访问this.state，但是更新状态却是用this.setState，不是直接在this.state上修改，为什么呢？
```
//读取状态
const count = this.state.count；

//更新状态
this.setState({count: count + 1}）；

//无意义
this.state.count = count + 1;
```


因为this.state说到底只是一个对象，单纯去修改一个对象的值是没有意义的，去驱动UI的更新才是有意义的，想想看，如果只是改了this.state这个对象，但是没有让React组件重新绘制一遍，那有什么用？你可以尝试在代码中直接修改this.state的值，会发现的确能够改变状态，但是却不会引发重新渲染。

所以，需要用一个函数去更改状态，这个函数就是setState，当setState被调用时，能驱动组件的更新过程，引发componentDidUpdate、render等一系列函数的调用。

当然，如果使用Object的setter功能，实际上也可以通过对this.state对象的直接修改来实现setState一样的功能，但是，如果React真的这么设计的话，我敢肯定，那样的API设计会更让人晕头转向，因为不管是谁，第一眼也看不出来修改一个this.state对象居然会引发重新渲染的副作用。

这么看来，React提供setState这个API是一个挺合理的决定。

因为setState并不会立刻修改this.state的值，所以下面的code可能产生很不直观的结果。
```
function incrementMultiple() {
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
}
```
直观上来看，当上面的incrementMultiple函数被调用时，组件状态的count值被增加了3次，每次增加1，那最后count被增加了3，但是，实际上的结果只给state增加了1。

原因并不复杂，就是因为调用this.setState时，并没有立即更改this.state，所以this.setState只是在反复设置同一个值而已，上面的code等同下面这样。











