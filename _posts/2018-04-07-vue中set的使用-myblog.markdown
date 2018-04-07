---
layout:     post
title:      "Vue.set的使用 "
date:       2018-04-07 13:23:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文
[网页链接](https://blog.csdn.net/qq_30455841/article/details/78666571)

这里我定义了一个列表数据，我将通过三个不同的按钮来控制列表数据。

首先在列表中动态新增一条数据：
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="app2">
<!--想了解这里key的作用请访问：(https://cn.vuejs.org/v2/api/#key)-->
    <p v-for="item in items" :key="item.id">
        {{item.message}}
    </p>
    <!--@click等价于v-on:click-->
    <button class="btn" @click="btn1Click()">点我试试</button><br/>
</div>

<script src="../../dist/vue.min.js"></script>
<script>
    var vm2=new Vue({
        el:"#app2",
        data:{
            items:[
                {message:"Test one",id:"1"},
                {message:"Test two",id:"2"},
                {message:"Test three",id:"3"}
            ]
        },
        methods:{
            btn1Click:function(){
                this.items.push({message:"动态新增"});//为data中的items动态新增一条数据
            }
        }
    });
</script>
</body>
</html>
```

通过[数组的变异方法](https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95)我们可以动态控制数据的增减，**但是我们却无法做到对某一条数据的修改**。这时候就需要Vue的内置方法来帮忙了~



### Vue.set() 响应式新增与修改数据

Vue.set( target, key, value )
* target：要更改的数据源(可以是对象或者数组)
* key：要更改的具体数据
* value ：重新赋的值

返回值：设置的值。


用法：
设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。**这个方法主要用于避开 Vue 不能检测属性被添加的限制。**

>注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="app2">
    <p v-for="item in items" :key="item.id">
        {{item.message}}
    </p>
    <button class="btn" @click="btn2Click()">动态赋值</button><br/><br/>
    <button class="btn" @click="btn3Click()">为data新增属性</button>
</div>

<script src="../../dist/vue.min.js"></script>
<script>
    var vm2=new Vue({
        el:"#app2",
        data:{
            items:[
                {message:"Test one",id:"1"},
                {message:"Test two",id:"2"},
                {message:"Test three",id:"3"}
            ]
        },
        methods:{
            btn2Click:function(){
                //Vue methods中的this 指向的是Vue的实例，这里可以直接在this中找到items
                Vue.set(this.items,0,{message:"Change Test",id:'10'})
            },
            btn3Click:function(){
                var itemLen=this.items.length;
                Vue.set(this.items,itemLen,{message:"Test add attr",id:itemLen});
            }
        }
    });

</script>
</body>
</html>
```
我点击第一个按钮后运行methods中的btn2Clcick方法，此时我要将Test one更改为Change Test




这里得警惕一种情况：
当写惯了JS之后，有可能我会想改数组中某个下标的中的数据我直接this.items[XX]就改了，如：
```
btn2Click:function(){
                this.items[0]={message:"Change Test",id:'10'}
            }

```


这种情况，是Vue文档中明确指出的注意事项，由于 JavaScript 的限制，Vue 不能检测出数据的改变，所以当我们需要动态改变数据的时候，Vue.set()完全可以满足我们的需求。



第三个按钮
可以看出，Vue.set()不光能修改数据，还能添加数据，**弥补了Vue数组变异方法的不足**


**Tip:Vue.set()在methods中也可以写成this.$set()**


## 补充

### vue注意事项

[https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9](https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)


由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
1. 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
2. 当你修改数组的长度时，例如：vm.items.length = newLength


为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新：
```
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```
为了解决第二类问题，你可以使用 splice：
```
example1.items.splice(newLength)
```


#### 对象更改检测注意事项

**还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：**
```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：
```
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 age 属性到嵌套的 userProfile 对象：


`Vue.set(vm.userProfile, 'age', 27)`


有时你可能需要为已有对象赋予多个新属性，比如使用 Object.assign() 或 _.extend()。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：

```
Object.assign(this.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
你应该这样做：
```
this.userProfile = Object.assign({}, this.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```



































