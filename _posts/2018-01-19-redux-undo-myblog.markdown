---
layout:     post
title:      "redux-undo"
date:       2018-01-159 13:20:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Redux
---

> “Yeah It's on. ”


## 正文

redux-undo是一个reducer增强组件,它提供了undoable函数,这个函数接收已经存在的reducer和配置对象,使用undo函数增强已经存在的reducer.


### Installation
`npm install --save redux-undo`

### API
```
import undoable from 'redux-undo';
undoable(reducer)
undoable(reducer, config)
```

### 使用 
首先导入redux-undo

```
 // Redux utility functions 
import { combineReducers } from 'redux';
// redux-undo higher-order reducer 
import undoable from 'redux-undo';
```
接着,添加undoable到你的reducer


```
combineReducers({
  counter: undoable(counter)
})
```
配置项可以这样传递
```
combineReducers({
  counter: undoable(counter, {
    limit: 10 // set a limit for the history 
  })
})
```

### 历史API
包装你的reducer想这样
```
 {
  past: [...pastStatesHere...],
  present: {...currentStateHere...},
  future: [...futureStatesHere...]
}
```


**现在你必须使用state.present获取当前的state
获取所有过去的state使用state.past.**


### Undo/Redo Actions

首先导入undo/redo action creators
```
import { ActionCreators } from 'redux-undo';
```
然后就可以使用store.dispatch()和undo/redo action creators来执行undo/redo操作.
```
store.dispatch(ActionCreators.undo()) // undo the last action 
store.dispatch(ActionCreators.redo()) // redo the last action 
 
store.dispatch(ActionCreators.jumpToPast(index)) // jump to requested index in the past[] array 
store.dispatch(ActionCreators.jumpToFuture(index)) // jump to requested index in the future[] array
```

### 配置
配置对象传递给undoable()(值是默认值)
```
undoable(reducer, {
  limit: false, // set to a number to turn on a limit for the history 
 
  filter: () => true, // see `Filtering Actions` section 
 
  undoType: ActionTypes.UNDO, // define a custom action type for this undo action 
  redoType: ActionTypes.REDO, // define a custom action type for this redo action 
 
  jumpToPastType: ActionTypes.JUMP_TO_PAST, // define custom action type for this jumpToPast action 
  jumpToFutureType: ActionTypes.JUMP_TO_FUTURE, // define custom action type for this jumpToFuture action 
 
  initialState: undefined, // initial state (e.g. for loading) 
  initTypes: ['@@redux/INIT', '@@INIT'] // history will be (re)set upon init action type 
  initialHistory: { // initial history (e.g. for loading) 
    past: [],
    present: config.initialState,
    future: []
  },
 
  debug: false, // set to `true` to turn on debugging 
})
```


### 过滤Actions
如果你不想包含每一步的action,可以传递一个函数到undoable
```
undoable(reducer, function filterActions(action, currentState, previousState) {
  return action.type === SOME_ACTION; // only add to history if action is SOME_ACTION只有some_action的action才能记录 
})
 
// or you could do... 
 
undoable(reducer, function filterState(action, currentState, previousState) {
  return currentState !== previousState; // only add to history if state changed只有state变化的才能记录重做 
})
```
或者你可以使用distinctState,includeAction,excludeAction助手函数
```
import undoable, { distinctState, includeAction, excludeAction } from 'redux-undo';
```

现在你可以使用助手函数了,相当简单
```
undoable(reducer, { filter: includeAction(SOME_ACTION) })
undoable(reducer, { filter: excludeAction(SOME_ACTION) })
 
// or you could do... 
 
undoable(reducer, { filter: distinctState() })
```
甚至还支持数组
```
undoable(reducer, { filter: includeAction([SOME_ACTION, SOME_OTHER_ACTION]) })
undoable(reducer, { filter: excludeAction([SOME_ACTION, SOME_OTHER_ACTION]) })
```




作者：smartphp
链接：https://www.jianshu.com/p/9fd5356cf8bd
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。











