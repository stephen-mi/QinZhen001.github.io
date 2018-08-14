---
layout:     post
title:      "实现一个Promise"
date:       2018-08-09 11:58:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ES6
---

> “Yeah It's on. ”


## 正文
[网页链接](https://github.com/forthealllight/blog/issues/4)


### Promise/A+规范

#### 术语
1. "promise"是一个对象或者函数，该对象或者函数有一个then方法
2. "thenable"是一个对象或者函数，用来定义then方法
3. "value"是promise状态成功时的值
4. "reason"是promise状态失败时的值

#### 要求
一个promise必须有3个状态，pending，fulfilled(resolved)，rejected当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态。当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。

promise英文译为承诺，也就是说promise的状态一旦发生改变，就永远是不可逆的。


----------


一个promise必须有一个then方法，then方法接受两个参数：

`promise.then(onFulfilled,onRejected)`

其中onFulfilled方法表示状态从pending——>fulfilled(resolved)时所执行的方法，而onRejected表示状态从pending——>rejected所执行的方法。


----------


为了实现链式调用，then方法必须返回一个promise


`promise2=promise1.then(onFulfilled,onRejected)`


### v1.0 初始版本myPromise



```javascript
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
```

同时，需要在myPromise的原型上定义链式调用的then方法：


```javascript
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}
```

上述就是一个初始版本的myPromise，在myPromise里发生状态改变，然后在相应的then方法里面根据不同的状态可以执行不同的操作。


```javascript
var p=new myPromise(function(resolve,reject){resolve(1)});
p.then(function(x){console.log(x)})
//输出1
```



**问题:这里myPromise无法处理异步的resolve**



### v2.0基于观察模式实现


为了处理异步resolve，我们修改myPromise的定义，用2个数组onFullfilledArray和onRejectedArray来保存异步的方法。在状态发生改变时，一次遍历执行数组中的方法。

```javascript
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    self.onFullfilledArray=[];
    self.onRejectedArray=[];
    function resolve(value){
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
          self.onFullfilledArray.forEach(function(f){
                f(self.value);
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
          });
        
       }
    }
    function reject(reason){
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
          self.onRejectedArray.forEach(function(f){
              f(self.reason);
             //如果状态从pending变为rejected， 
             //那么就遍历执行里面的异步方法
          })
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
```

对于then方法，状态为pending时，往数组里面添加方法：


```javascript
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "pending":
        self.onFullfilledArray.push(function(){
             onFullfilled(self.value)
        });
        self.onRejectedArray.push(function(){
             onRejected(self.reason)
        });
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}
```


这样，通过两个数组，在状态发生改变之后再开始执行，这样可以处理异步resolve无法调用的问题。这个版本的myPromise就能处理所有的异步，那么这样做就完整了吗？

没有，我们做Promise/A+规范的最大的特点就是链式调用，也就是说then方法返回的应该是一个promise。

### v3.0then方法实现链式调用
要通过then方法实现链式调用，那么也就是说then方法每次调用需要返回一个primise,同时在返回promise的构造体里面，增加错误处理部分，我们来改造then方法

```javascript
myPromise.prototype.then=function(onFullfilled,onRejected){
    let self=this;
    let promise2;
    switch(self.status){
      case "pending":
        promise2=new myPromise(function(resolve,reject){
             self.onFullfilledArray.push(function(){
                try{
                   let temple=onFullfilled(self.value);
                   resolve(temple)
                }catch(e){
                   reject(e) //error catch
                }
             });
             self.onRejectedArray.push(function(){
                 try{
                   let temple=onRejected(self.reason);
                   reject(temple)
                 }catch(e){
                   reject(e)// error catch
                 }
             });
        })
      case "resolved":
        promise2=new myPromise(function(resolve,reject){
            try{
              let temple=onFullfilled(self.value);
              //将上次一then里面的方法传递进下一个Promise的状态
              resolve(temple);
            }catch(e){
              reject(e);//error catch
            }
        })
        break;
      case "rejected":
        promise2=new myPromise(function(resolve,reject){
            try{
               let temple=onRejected(self.reason);
               //将then里面的方法传递到下一个Promise的状态里
               resolve(temple);   
            }catch(e){
               reject(e);
            }
        })
        break;
      default:       
   }
   return promise2;
}
```

这样通过then方法返回一个promise就可以实现链式的调用：

```
p.then(function(x){console.log(x)}).then(function(){console.log("链式调用1")}).then(function(){console.log("链式调用2")})
//输出
1
链式调用1
链式调用2
```


这样我们虽然实现了then函数的链式调用，但是还有一个问题，就是在Promise/A+规范中then函数里面的onFullfilled方法和onRejected方法的返回值可以是对象，函数，甚至是另一个promise。



### v4.0 then函数中的onFullfilled和onRejected方法的返回值问题


特别的为了解决onFullfilled和onRejected方法的返回值可能是一个promise的问题。

