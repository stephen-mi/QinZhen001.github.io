---
layout:     post
title:      "vue-router query和params区别"
date:       2018-08-30 23:14:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://segmentfault.com/a/1190000012735168)

### query方式传参和接收参数

```
传参: 
this.$router.push({
        path:'/xxx'
        query:{
          id:id
        }
      })
  
接收参数:
this.$route.query.id
```


**注意:传参是this.$router,接收参数是this.$route,这里千万要看清了！！！**



### this.$router 和this.$route有何区别？


在控制台打印两者可以很明显的看出两者的一些区别


1. $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
2. $route为当前router跳转对象，里面可以获取name、path、query、params等


### params方式传参和接收参数

```
传参: 
this.$router.push({
        name:'xxx'
        params:{
          id:id
        }
      })
  
接收参数:
this.$route.params.id
```



**注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！**


----------



另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，而params相当于post请求，参数不会再地址栏中显示



**还有一点，params数据刷新会消失，query则不会**



