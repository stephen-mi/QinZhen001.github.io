---
layout:     post
title:      "vue中props单向数据流"
date:       2017-11-29 23:12:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Vue
---

> “Yeah It's on. ”


## 正文


[网页链接](https://cn.vuejs.org/v2/guide/components.html#Prop)

Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。

另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你**不应该**在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。

在两种情况下，我们很容易忍不住想去修改 prop 中数据：
1. Prop 作为初始值传入后，子组件想把它当作局部数据来用；
2. Prop 作为原始数据传入，由子组件处理成其它数据输出。

对这两种情况，正确的应对方式是：
定义一个局部变量，并用 prop 的值初始化它：
```
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
定义一个计算属性，处理 prop 的值并返回：
```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

>注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变**它会影响**父组件的状态。

### Prop 验证
我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。这对于开发给他人使用的组件非常有用。

要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组：
```
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
type 可以是下面原生构造器：
* String
* Number
* Boolean
* Function
* Object
* Symbol


type 也可以是一个自定义构造器函数，使用 instanceof 检测。

当 prop 验证失败，Vue 会抛出警告 (如果使用的是开发版本)。注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。

### 非 Prop 特性
所谓非 prop 特性，就是指它可以直接传入组件，而不需要定义相应的 prop。

尽管为组件定义明确的 prop 是推荐的传参方式，组件的作者却并不总能预见到组件被使用的场景。所以，组件可以接收任意传入的特性，这些特性都会被添加到组件的根元素上。

例如，假设我们使用了第三方组件 bs-date-input，它包含一个 Bootstrap 插件，该插件需要在 input 上添加 data-3d-date-picker 这个特性。这时可以把特性直接添加到组件上 (不需要事先定义 prop)：

`<bs-date-input data-3d-date-picker="true"></bs-date-input>`

添加属性 data-3d-date-picker="true" 之后，它会被自动添加到 bs-date-input 的根元素上。

### 自定义事件
我们知道，父组件使用 prop 传递数据给子组件。但子组件怎么跟父组件通信呢？这个时候 Vue 的自定义事件系统就派得上用场了。

每个 Vue 实例都实现了事件接口，即：
* 使用 $on(eventName) 监听事件
* 使用 $emit(eventName) 触发事件

>Vue 的事件系统与浏览器的 EventTarget API 有所不同。尽管它们的运行起来类似，但是 $on 和 $emit 并不是addEventListener 和 dispatchEvent 的别名。3

另外，父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。

>不能用 $on 侦听子组件释放的事件，而必须在模板里直接用 **v-on** 绑定，参见下面的例子。

```
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>

Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

在本例中，子组件已经和它外部完全解耦了。它所做的只是报告自己的内部事件，因为父组件可能会关心这些事件。请注意这一点很重要。

### **给组件绑定原生事件**
有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 **.native**。例如：
```
<my-component v-on:click.native="doTheThing"></my-component>
```

### 使用自定义事件的表单输入组件
自定义事件可以用来创建自定义的表单输入组件，使用 v-model 来进行数据双向绑定。要牢记：

`<input v-model="something">`

这不过是以下示例的语法糖：
```
<input
  v-bind:value="something"
  v-on:input="something = $event.target.value">
```

所以在组件中使用时，它相当于下面的简写：
```
<custom-input
  v-bind:value="something"
  v-on:input="something = arguments[0]">
</custom-input>
```

所以要让组件的 v-model 生效，它应该 (从 2.2.0 起是可配置的)：
* 接受一个 value prop
* 在有新的值时触发 input 事件并将新值作为参数

我们来看一个非常简单的货币输入的自定义控件：
`<currency-input v-model="price"></currency-input>`

```
Vue.component('currency-input', {
  template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
  props: ['value'],
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function (value) {
      var formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 2 位小数
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.') + 3
        )
      // 如果值尚不合规，则手动覆盖为合规的值
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过 input 事件带出数值
      this.$emit('input', Number(formattedValue))
    }
  }
})
```
