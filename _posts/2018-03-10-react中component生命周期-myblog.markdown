---
layout:     post
title:      "react中component生命周期"
date:       2018-03-10 21:30:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.jianshu.com/p/c9bc994933d5)

![enter description here][1]

[生命周期图](https://segmentfault.com/image?src=https://cloud.githubusercontent.com/assets/3348398/15650035/4c5eb69c-26a8-11e6-8dd3-26ddc32f3293.png&objectId=1190000005599249&token=fde743931454de8206afb99bee8eb52a)


```
class TestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            solders: ["小虎", "小凤", "小凰"]
        }
        console.log("组件初始化")
    }

    componentWillMount() {
        console.log("组件马上就要挂载了")
    }

    componentDidMount() {
        console.log("组件已经挂载了")
    }

    componentWillReceiveProps(nextProps) {
        console.log("组件要接收父组件的值了 ", nextProps)
    }

    shouldComponentUpdate(nextProps,nextState) {
        console.log("判断是不是要更新组件")
        return true    // 记得要返回true(这里可以进行条件判断)
    }

    componentWillUpdate(nextProps,nextState) {
        console.log("组件马上就要更新了")
    }

    componentDidUpdate(prevProps,prevState) {
        console.log("组件更新完毕")
    }

    componentWillUnmount() {
        console.log("组件马上就要卸载了")
    }
}
```


### constructor
constructor参数接受两个参数props,context

可以获取到父组件传下来的的props,context,**如果你想在constructor构造函数内部(注意是内部哦，在组件其他地方是可以直接接收的)**使用props或context,则需要传入，并传入super对象。

```
 constructor(props,context) {
  super(props,context)
  console.log(this.props,this.context) // 在内部可以使用props和context
}
```

当然如果你只需要在构造函数内使用props或者context，那么只传入一个参数即可，如果都不用，就都不传。



#### 关于ES6的class constructor和super
只要组件存在constructor,就必要要写super,否则this指向会错误

```
 constructor() {
  console.log(this) // 报错，this指向错误
}
```

### componentWillMount 组件将要挂载
1. 组件刚经历constructor,初始完数据
2. 组件还未进入render，组件还未渲染完成，dom还未渲染

componentWillMount 一般用的比较少，更多的是用在服务端渲染

**但是这里有一个问题**

ajax请求能写在willmount里吗？
答案是不推荐，别这么写

1. 虽然有些情况下并不会出错，但是如果ajax请求过来的数据是空，那么会影响页面的渲染，可能看到的就是空白。
2. 不利于服务端渲染，在同构的情况下，生命周期会到componentwillmount，这样使用ajax就会出错


### componentDidMount 组件渲染完成
组件第一次渲染完成，此时dom节点已经生成，**可以在这里调用ajax请求**，返回数据setState后组件会重新渲染



### componentWillReceiveProps (nextProps)
componentWillReceiveProps在接受**父组件改变后的props需要重新渲染组件**时用到的比较多

>例如：父组件状态改变，给子组件传入了新的prop值。用于组件 props 变化后，更新state。


它接受一个参数
nextProps
通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件

```
componentWillReceiveProps (nextProps) {
    nextProps.openNotice !== this.props.openNotice && this.setState({
        openNotice:nextProps.openNotice
    }，() => {
      console.log(this.state.openNotice:nextProps) //将state更新为nextProps,在setState的第二个参数（回调）可以打印出新的state
  })
}
```

### shouldComponentUpdate(nextProps,nextState)
唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，（暂时这么理解，其实setState以后有些情况并不会重新渲染，比如**数组引用不变**）在这里return false可以阻止组件的更新

因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断


### componentWillUpdate (nextProps,nextState)
shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState

### render函数
render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到**最小的有差异的DOM节点**，并重新渲染


>react16中 render函数允许返回一个数组，单个字符串等，不在只限制为一个顶级DOM节点，可以减少很多不必要的div


意思你现在可以这样：

```
render () {
  return " "
}
```
或者这样：
```
render () {
  return [
     <div></div>
    <div></div>
    ]
}
```

### componentDidUpdate(prevProps,prevState)
组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。
如果你理解了组件一次重新渲染的过程，那么你应该理解下面5处打印出来的state应该是相同的。

```
componentWillReceiveProps (nextProps,nextState) {
    this.setState({
        fengfeng:nextProps.fengfeng
    },()=>{
        console.log(this.state.fengfeng) //1
    })
    
}
shouldComponentUpdate (nextProps,nextState) {
    console.log(nextState.fengfeng)  //2
}
componentWillUpdate (nextProps,nextState) {
    console.log(nextState.fengfeng)  //3
}
componentDidUpdate (prevProps,prevState) {
    console.log(this.state.fengfeng) //5
}
render () {
    console.log(this.state.fengfeng) //4
    return (
        <div></div>
    )
}
```


### componentWillUnmount()
componentWillUnmount也是会经常用到的一个生命周期，用好这个确实很重要

1. clear你在组建中所有的setTimeout,setInterval
2. 移除所有组建中的监听 removeEventListener


也许你会经常遇到这个warning:
```
Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.
```
是因为你在组建中的ajax请求返回中setState,而你组件销毁的时候，请求还未完成，因此会报warning

解决办法为
```
componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
     this.isMount && this.setState({   // 增加条件ismount为true时
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}
```


## 拓展
父子组件， componentWillMount生命周期是先进入父组件还是子组件？
componentDidMount呢？

[https://www.jianshu.com/p/ee122bb5b14b](https://www.jianshu.com/p/ee122bb5b14b)


```
/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]          // 子组件constructor()
 *     - [children's componentWillMount and render]   // 子组件willmount render
 *     - [children's componentDidMount]  // 子组件先于父组件完成挂载didmount
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */
```


**所以在react的组件挂载及render过程中，最底层的子组件是最先完成挂载及更新的。**


**constructor()构造函数、componentWillMount执行顺序：**
顶层父组件--子组件--子组件--...--底层子组件




**render、componentDidMount顺序：**
底层子组件--子组件--子组件--...--顶层父组件

update phases同理
















作者：Evan_zhan
链接：https://www.jianshu.com/p/c9bc994933d5
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


  [1]: https://segmentfault.com/image?src=https://cloud.githubusercontent.com/assets/3348398/15650035/4c5eb69c-26a8-11e6-8dd3-26ddc32f3293.png&objectId=1190000005599249&token=fde743931454de8206afb99bee8eb52a