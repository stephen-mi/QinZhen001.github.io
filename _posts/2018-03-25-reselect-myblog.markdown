---
layout:     post
title:      "reselect"
date:       2018-03-25 15:26:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Redux
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000011936772)

### 为什么我们需要reselect
先看下下面的一个组件
```
import React, { Component } from 'react'
import { connect } from 'react-redux'

class UnusedComp extends Component {
    render() {
        const { a, b, c, fab, hbc, gac, uabc } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}

function f(x, y) {
    return a + b
}

function h(x, y) {
    return x + 2 * y
}

function g(x, y) {
    return 2 * x + y
}

function u(x, y, z) {
    return x + y + z
}
```




这个UnusedComp 组件关心这样的几个props： a, b, c, f(a,b), h(b, c), g(a, c), u(a, b, c), 其中f, h, g, u分别是一个函数。 关于这几个计算的值， 我们应该怎么处理呢？


**把数据直接计算在redux**
第一种， 我们把所有值存在redux， 所有store的结构大概是这样的：
store = {
    a:1,
    b:1,
    c:1,
    fab: 2, // a + b
    hbc: 3, // b + 2c
    gac: 3, // 2a + c
    uabc: 3 // a + b + c
}

这样我们的组件简单了， 只需要直接取值渲染就好 const { a, b, c, fab, hbc, gac, uabc } = this.props 。 那么问题来了， reducer的函数应该怎么处理呢？ 对应的如下：

```
switch(action.type) {
    case 'changeA': {
        return {
            ...state,
            a: action.a,
            fab: f(action.a, state.b),
            gac: g(action.a, state.c)
            uabc: u(action.a, state.b, state.c)
        }
    }
    case 'changeB': {
        ...
    }
    case 'changeC': {
        ...
    }
}
```
我们的reducer 函数非常复杂了， 我们每更新一个状态值。 都得维护与这个值相关的值， 不然就会有数据不一致。


为了保证数据流的清晰， 更新的简单。 我们只把最基本的状态存储在redux。store的结构和redcuer函数如下：



**reducer 只存最基本状态(这很重要)**

```
store = {
    a:1,
    b:1,
    c:1,
}
...
switch(action.type) {
    case 'changeA': {
        return {
            ...state,
            a: action.a
        }
    }
    ...
}
```
此刻组件可能是这样的：

```
class UnusedComp extends Component {
    render() {
        const { a, b, c } = this.props
        const fab = f(a, b)
        const hbc = h(b, c)
        const gac = g(a, c)
        const uabc = u(a, b, c)
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}
```
或者这样的：
```
class UnusedComp extends Component {
    componentWillReciveProps(nextProps) {
        const { a, b, c } = this.props
        this.fab = f(a, b)
        this.hbc = h(b, c)
        this.gac = g(a, c)
        this.uabc = u(a, b, c)
    }
    

    render() {
        const { a, b, c } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{this.fab}</h6>
                <h6>{this.hbc}</h6>
                <h6>{this.gac}</h6>
                <h6>{this.uabc}</h6>
            </div>
        )
    }
}
```

对于第一种情况， 当组件ownProps（组件自身属性， 非redux传递）, 或者setState 的时候 都会执行计算。 
对于第二钟情况， 当组件ownProps 变化的时候， 会执行计算。 


而且这两种都违背了 我们的基本原则： **保持组件逻辑简单**


让数据逻辑离开组件！
```
// 可以写成函数式组件
class UnusedComp extends Component {
    render() {
        const { a, b, c, fab, hbc, gac, uabc } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {a, b, c} = state
    return {
        a,
        b,
        c,
        fab: f(a,b),
        hbc: h(b,c),
        gac: g(a,c),
        uabc: u(a, b, c)
    }
}
UnusedComp = connect(mapStateToProps)(UnusedComp)
```

组件很简单， 接收数据展示就可以了。 看似很美好！ 我们知道当store数据被改变的时候， 会通知所有connect的组件（前提是没被销毁）。 
所有假设页面上还有 A， B， C三个组件， 这三个组件任意状态（存在redux的状态）的改变， 都会出发这里的 f, h, g, u的执行。。。听起来很扯！！！的确很扯！（在redner里面， willReciveProps里面计算是这里是不会引起函数执行的）。 但是这通常不是问题， 因为我们一般每个页面只有一个 容器组件 和redux交互， 其他子组件通过props的方式获取数据和action。 而且react-router在切换路由的时候， 是会销毁掉前一个路由的组件。 这样同一个时间只会有 一个 容器组件。

在考虑一种情况， 假设UnusedComp还有 x, y, z 状态属性， 存在redux。 这3个属性就是简单的3个值， 只用来展示。 可是当x， y， z改变的时候，也会触发计算。 这里发生的计算不管是在render里面计算， 还是willReciveProps, 还是mapStateToProps里 都无法避免。



### 精确控制计算
仿佛我们依据找到了方法：

1. redux只存基本状态
2. react-router + 单 容器组件 组件

现实很残酷！ 实际上x, y, z这种属性， 一定大量存在。 光是这一点就会导致大量的无效计算。 之前讨论的3种方式 （render， willRecive，mapStateToProps）无法避免这种计算。

另外mapStateToProps 还会被其他store的值改变影响 ，毕竟react-router + 单 容器组件 组件 这种组织方式只是最美好的情况。 我们有些业务就是处于性能的考虑，没有销毁之前路由的组件， 用我们自己的路由。有些页面也不是 单容器组件，尴尬！！


明显的， 我们是知道 x， y， z的变化是不需要计算的， 而a，b， c变化是需要计算的。 如何描述给程序呢？另外 mapStateToProps 这种方式还带来了好处， 我们在描述的时候，不会侵入组件！！。


最原始的描述：
```
let memoizeState = null
function mapStateToProps(state) {
    const {a, b, c} = state
    if (!memoizeState) { 
       memoizeState =  {
            a,
            b,
            c,
            fab: f(a,b),
            hbc: h(b,c),
            gac: g(a,c),
            uabc: u(a, b, c)
        }
    } else {
        if (!(a === memoizeState.a && b === memoizeState.b) ) {
            // f should invoke
            memoizeState.fab = f(a, b)
        }
        if (!(b === memoizeState.b && c === memoizeState.c) ) {
            // h should invoke
            memoizeState.hbc = h(b, c)
        }
        if (!(a === memoizeState.a && c === memoizeState.c) ) {
            // g should invoke
            memoizeState.gac = g(a, c)
        }
        if (!(a === memoizeState.a && b === memoizeState.b && c === memoizeState.c) ) {
            // u should invoke
            memoizeState.uabc = u(a, b, c)
        }
        memoizeState.a = a
        memoizeState.b = b
        memoizeState.c = c
    }
    
    return memoizeState
}
```

首选， 我们知道fab的值与a,b 有关， 所以当a, b 有变化的时候，f需要重新执行。 其他同理， 这样的话函数一定是只在必要的时候执行。


### 使用reselect
reselect 解决了我们上面的那个问题， 我们也不必每次用这个最原始的描述了， 对应的reselect描述是这样的

```
import { createSelector } from 'reselect'

fSelector = createSelector(
    a => state.a,
    b => state.b,
    (a, b) => f(a, b)
)
hSelector = createSelector(
    b => state.b,
    c => state.c,
    (b, c) => h(b, c)
)
gSelector =  createSelector(
    a => state.a,
    c => state.c,
    (a, c) => g(a, c)
)
uSelector = createSelector(
    a => state.a,
    b => state.b,
    c => state.c,
    (a, b, c) => u(a, b, c)
)

...
function mapStateToProps(state) {
    const { a, b, c } = state
    return {
        a,
        b,
        c,
        fab: fSelector(state),
        hbc: hSelector(state),
        gac: gSelector(state),
        uabc: uSelector(state)
    }
}
```

在 createSelector 里面我们先定义了 input-selector 函数， 最后定义了 值是如何计算出来的。 selector保证了，当input-selector 返回结果相等的时候，不会计算。



### 举个栗子
containers/VisibleTodoList.js
```
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
 
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}
 
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}
 
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
 
export default VisibleTodoList
```

在上面的例子中，mapStateToProps调用getVisibleTodos计算todos。这很好，但是有一个缺点：todos每次组件更新时都会计算。如果状态树很大，或者计算开销很大，则在每次更新时重复计算都可能导致性能问题。重新选择可以帮助避免这些不必要的重新计算。

**Creating a Memoized Selector**
We would like to replace getVisibleTodos with a memoized selector that recalculates todos when the value of state.todos or state.visibilityFilter changes, but not when changes occur in other (unrelated) parts of the state tree.

Reselect provides a function createSelector for creating memoized selectors. createSelector takes an array of input-selectors and a transform function as its arguments. If the Redux state tree is mutated in a way that causes the value of an input-selector to change, the selector will call its transform function with the values of the input-selectors as arguments and return the result. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.

Let's define a memoized selector named getVisibleTodos to replace the non-memoized version above:



我们想getVisibleTodos用一个memoized选择器替换它，该选择器在状态树的其他（不相关的）部分发生变化todos时重新计算值的何时state.todos或是否state.visibilityFilter发生变化。

重新选择提供了createSelector创建memoized选择器的功能。createSelector以一组输入选择器和一个变换函数作为参数。如果Redux状态树以导致输入选择器的值发生变化的方式进行变异，则选择器将使用输入选择器的值作为参数来调用其变换函数并返回结果。如果输入选择器的值与先前对选择器的调用相同，则它将返回先前计算的值，而不是调用变换函数。

让我们定义一个名为memoized的选择器getVisibleTodos来替换上面的非memoized版本：

selectors/index.js
```
import { createSelector } from 'reselect'
 
const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos
 
export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

在上面的例子中，getVisibilityFilter和getTodos输入选择器。它们被创建为普通的非memoized选择器函数，因为它们不转换他们选择的数据。getVisibleTodos另一方面是一个memoized选择器。它需要getVisibilityFilter并getTodos作为输入选择器，以及计算过滤待办事项列表的变换函数。


## 最后
如果 你是react-router 并且是 单 容器组件。 那么可能在 mapStateToProps里面计算，性能问题并不大。 而且性能不应该是我们第一要考虑的东西， 我们首先要考虑的是简单性，尤其是组件的简单性。 当我们的业务复杂到需要考虑性能的时候， reselect是我们不错的选择！

