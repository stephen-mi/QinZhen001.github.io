---
layout:     post
title:      "prop-types库"
date:       2018-01-17 22:59:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文

[网页链接](https://www.cnblogs.com/penghuwan/p/6796139.html)


与react配套的类型检测库——prop-types的运用。

顾名思义prop-types就是对react组件中props对象中的变量进行类型检测的，因为props是react数据流的管道，我们通过prop-types就可以轻松监控react里大多数据的变量类型先介绍下propTypes的基本用法。

### prop-types用法
1. npm install prop-types
2. 然后通过下面的写法对你的某一个组件的props中的变量进行类型检测
```
yourComponent.propTypes = {
    属性1：属性1的变量类型，
    属性2：属性2的变量类型
    //...
}
```


### 例子
利用propTypes检测全部数据类型的变量
```
  import React from 'react'
  class Son extends React.Component{

  render(){
    return (<div style ={{padding:30}}>
              {this.props.number}
              <br/>
              {this.props.array}
              <br/>
              {this.props.boolean.toString()}
            </div>)
           }
}
class Father extends React.Component{
   render(){
     return (<Son
              number = {'1'}
              array = {'[1,2,3]'}
              boolean = {'true'}
              />)
            }
}  import React from 'react'
  class Son extends React.Component{

  render(){
    return (<div style ={{padding:30}}>
              {this.props.number}
              <br/>
              {this.props.array}
              <br/>
              {this.props.boolean.toString()}
            </div>)
           }
}
class Father extends React.Component{
   render(){
     return (<Son
              number = {'1'}
              array = {'[1,2,3]'}
              boolean = {'true'}
              />)
            }
}
```
比如这个例子，我们通过props从父组件向子组件传递属性，你原本试图通过number，array和boolean这三个属性分别向Son中传递一个数字，数组和一个布尔型数值。但你过度疲惫，把它们都写成了字符串，虽然渲染是正常的，但这可能会导致你接下来调用一些方法的时候发生错误，而系统并不提供任何提示。

让我们给它加上propTypes的类型检测：

```
import React from 'react'
import PropTypes from 'prop-types';
class Son extends React.Component{
   render(){
        return (<div style ={{padding:30}}>
                      {this.props.number}
                      <br/>
                      {this.props.array}
                      <br/>
                      {this.props.boolean.toString()}
                    </div>)
                  }
}
Son.propTypes = {
        number:PropTypes.number,
        array:PropTypes.array,
        boolean:PropTypes.bool
}
class Father extends React.Component{
    render(){
         return (<Son
                       number = {'1'}
                       array = {'[1,2,3]'}
                       boolean = {'true'}
                        />)
                  }
}
```

然后我们就能看到报的错误了，而且这个时候，报的错误包括错误的props属性名称，错误的变量类型，属性所在的组件名称，预期的正确的变量类型，错误代码的位置以及其他更详细的信息。


propTypes 能用来检测全部数据类型的变量，包括基本类型的的string，boolean,number,以及引用类型的object,array,function,甚至还有ES6新增的symbol类型

```
Son.propTypes = {
     optionalArray: PropTypes.array,//检测数组类型
     optionalBool: PropTypes.bool,//检测布尔类型
     optionalFunc: PropTypes.func,//检测函数（Function类型）
     optionalNumber: PropTypes.number,//检测数字
     optionalObject: PropTypes.object,//检测对象
     optionalString: PropTypes.string,//检测字符串
     optionalSymbol: PropTypes.symbol,//ES6新增的symbol类型
}
```

>你大概能够注意到，五种基本类型中的undefined和null并不在此列，propTypes类型检测的缺憾之一是，对于undefined和null的值，它无法捕捉错误


### oneOfType实现多选择检测
可规定多个检测通过的数据类型

上个例子中类型检测的要求是一个变量对应一个数据类型，也就是规定的变量类型只有一个。那么怎样能让它变得灵活一些，比如规定多个可选的数据类型都为检测通过呢？PropTypes里的oneOfType方法可以做到这一点，oneOfType方法接收参数的是一个数组，数组元素是你希望检测通过的数据类型。

```
import React from 'react'
import PropTypes from 'prop-types';
class Son extends React.Component{
   render(){
     return (<div style ={{padding:30}}>
                    {this.props.number}
                 </div>)
              }
}
Son.propTypes = {
       number:PropTypes.oneOfType(
           [PropTypes.string,PropTypes.number]
         )
}
class Father extends React.Component{
    render(){
         //分别渲染数字的11和字符串的11
        return (<div>
                      <Son number = {'字符串11'}/>
                      <Son number = {11}/>
                    </div>)
                }
}
```

这时候，因为在类型检测中，number属性的规定类型包括字符串和数字两种，所以此时控制台无报错

### oneOf实现多选择检测
可规定多个检测通过的变量的值

同样的道理，我们也可以规定多个可检测通过的变量的值，这就要用到PropTypes里的oneOf方法，和PropTypes方法一样oneOf方法接收参数的是一个数组，数组元素是你希望检测通过的变量的值，比如我们把上面类型检测的部分改成：

```
Son.propTypes = {
    number:PropTypes.oneOf(
          [12,13]
      )
}
```


### arrayOf,objectOf实现多重嵌套检测

试想一下，如果我们检测的是基本类型的变量，那么这自然是很简单的，但当我们要检测的是一个引用类型的变量呢？当我们除了检测这个变量是否符合规定的引用类型外（Object/array），还想要进一步检测object中的属性变量或array中数组元素的数据类型时，单靠上面的方法已经不能满足要求了。这时候就要用到PropTypes的arrayOf，objectOf方法。

arrayOf接收一个参数，这个参数是规定的数组元素的数据类型。objectOf接收的参数则是属性的数据类型


```
import React from 'react'
import PropTypes from 'prop-types';
class Son extends React.Component{
    render(){
       return (<div style ={{padding:30}}>
                {this.props.array}
               </div>)
           }
}
Son.propTypes = {
     array:PropTypes.arrayOf(PropTypes.number)
}
class Father extends React.Component{
    render(){
       return (<div>
                 <Son array = {[1,2,3,4]}/>
               </div>)
}
}
```

正常渲染，然后我们把`<Son array = {[1,2,3,4]}/>改为<Son array = {['1','2','3','4']}/>`，报错


### shape
通过shape方法检测目标对象不同属性的不同数据类型

如果你认真思考一下的话，你会发现3.4中的objectOf有一个缺陷，就是它内部的属性的数据类型被强行规定为一种，但通常一个对象里应该是有多种不同类型的属性了，那么这时候objectOf就不符合要求了，我们应该使用shape方法，其用法：

```
PropTypes.shape({
   属性1：类型1，
   属性2：类型2，
  //...
}),
```


举个例子：
```
import React from 'react'
import PropTypes from 'prop-types';
class Son extends React.Component{
     render(){
        return (<div style ={{padding:30}}>
                  {'我的名字叫' + this.props.object.name}
                  <br/>
                  {'我的年龄是' + this.props.object.age}
                 </div>)
             }
}
Son.propTypes = {
     object:PropTypes.shape({
     name:PropTypes.string,
     age:PropTypes.number
      })
}
class Father extends React.Component{
    render(){
       return (<div>
                  <Son object = {{name:'彭湖湾',age:20}}/>
               </div>)
     }
}
```

### isRequired
通过isRequired检测props中某个必要的属性（如果该属性不存在就报错）

有时候，我们在对某个变量进行类型检测时，我们不仅要求它符合预期的类型，同时也要求它是必须写入的，这时候就要用到isRequired。

```
Son.propTypes = {
    number:PropTypes.number.isRequired
}
```


### PropTypes.any.isRequired

我们上述的写法是number:PropTypes.number.isRequired，这要求number是数字类型，但如果你不想控制number的类型而仅仅是想控制它的必要性呢？难道写成number:isRequired或number:PropTypes.isRequired? 

这个时候PropTypes.any就登场啦！它代表了该变量可取任何一种数据类型，所以你可以写成这样——**number: PropTypes.any.isRequired**



https://www.cnblogs.com/penghuwan/p/6796139.html









