---
layout:     post
title:      "combineReducers"
date:       2018-03-09 14:52:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Redux
---

> “Yeah It's on. ”


## 正文
[网页链接](http://blog.csdn.net/woshizisezise/article/details/51142968)

随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分。

combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。

最终，state 对象的结构会是这样的：
```
{
  reducer1: ...
  reducer2: ...
}
```

通过为传入对象的 reducer 命名不同来控制 state key 的命名。例如，你可以调用 combineReducers({ todos: myTodosReducer, counter: myCounterReducer }) 将 state 结构变为 { todos, counter }。

通常的做法是命名 reducer，然后 state 再去分割那些信息，因此你可以使用 ES6 的简写方法：combineReducers({ counter, todos })。这与 combineReducers({ counter: counter, todos: todos }) 一样。



>之前的文档曾建议使用 ES6 的 import * as reducers 语法来获得 reducer 对象。这一点造成了很多疑问，因此现在建议在 reducers/index.js 里使用 combineReducers() 来对外输出一个 reducer。


返回值
(Function)：一个调用 reducers 对象里所有 reducer 的 reducer，并且构造一个与 reducers 对象结构相同的 state 对象。


注意
本函数设计的时候有点偏主观，就是为了避免新手犯一些常见错误。也因些我们故意设定一些规则，但如果你自己手动编写根 redcuer 时并不需要遵守这些规则。


每个传入 combineReducers 的 reducer 都需满足以下规则：
* 所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。
* 永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
* 如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。



### 内部分析
看了第一部分官网的介绍，大家都应该知道了它是如何使用的，但是作为开发人员，我觉得我们有必要思考一下它里面的究竟是如何实现的呢？下面我们来分析一下。

第一步，我们知道reducer 就是一个函数，接收旧的 state 和 action，返回新的 state。知道这点很重要！

第二步，我们来看combineReducers(reducers)方法，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

那么combineReducers(reducers)返回的就是一个最终的reducer，reducer里面会返回新的state。下面我们结合代码来看：

```
const rootReducer = combineReducers({
  reducer1,
  reducer2,
  reducer3,
  ...
});
```

这里根reducer暂且起名为rootReducer，它就是通过combineReducers(reducers)返回的。那么combineReducers(reducers)是如何做的呢？

第三步，我们自己来写一个function，来代替combineReducers(reducers)方法，从而来摸索内部是如何实现的，新建一个方法，如下：
```
var combineReducers1 = function(obj){
    //内部具体代码
}
```
这个方法返回的肯定是一个reducer，那么我们先写出来：
```
var combineReducers1 = function(obj){
    //内部具体代码

    //返回最终的reducer
    return reducer;
}
```
我们应该能想到下一步该做什么了，既然返回一个reducer，那么我们就要创建一个reducer了，方法接收两个参数，一个是state，一个是action，继续：
```
var combineReducers1 = function(obj){
    //内部具体代码

    function reducer(state,action){
        //reducer具体逻辑
    }

    //返回最终的reducer
    return reducer;
}
```
reducer最终返回的是一个state，我们接着写：

```
var combineReducers1 = function(obj){
    //内部具体代码

    var finalState = {};
    function reducer(state,action){
        //reducer具体逻辑


        //返回state
        return finalState;
    }

    //返回最终的reducer
    return reducer;
}
```

那么现在想一想，我们传入的object对象，实际上就是我们传入的所有的reducer方法的集合，实际上里面做的就是分别调用每个reducer方法，将每个reducer方法作为value值赋予我们传入object对象的属性名，通过JavaScript遍历对象获取属性名赋值的方法，我们可以得到最关键的代码，接着往下写：
```
var combineReducers1 = function(obj){
    //内部具体代码

    var finalState = {};
    function reducer(state,action){
        //reducer具体逻辑

        for (var p in obj) {
         //根据key属性值调用function(state.属性名，action)
         finalState[p] = obj[p](state[p], action);
        }

        //返回state
        return finalState;
    }

    //返回最终的reducer
    return reducer;
}
```
因为我们reducer()方法里传入的state，其实是根state，所以得根据属性名来获取对应的reducer上的state，到这里，关于combineReducers()方法的具体实现我们已经分析完了，了解了combineReducers是如何工作的，那么我们以后的工作才更好的展开，不至于出现了问题而不知道如何解决。


## 思考
Redux官方教程和大部分代码中，Reducer中关于default都是返回state的
```
default:
      return state
```
但是在Redux官方案例中，也有的并不是返回state。比如shopping cart中
```
//reducers/products.js
const byId = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS: //省略
        default:
            const { productId } = action
            if (productId) {
                return {
                    ...state,
                    [productId]: products(state[productId], action)
                }
            }
            return state
    }
}

//reducers/cart.js
const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST: return initialState
    case CHECKOUT_FAILURE: return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}
```

如果要执行default里的代码，应该是发出的action.type在其它case里找不到。那如果发出了一个这样的action，那是怎么判断 是该执行products.js里的default，还是执行cart.js里的default呢?

>这里我思考了好久 Orz  =。=   Orz  


**经过本人亲手测试，每个reducer中的default都会执行** 


这里也发现了，其实，如果有多个reducer都有相同的action.type，这样发出的action会匹配到多个reducer，会依次执行。


