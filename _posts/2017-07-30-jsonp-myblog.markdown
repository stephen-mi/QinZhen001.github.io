---
layout:     post
title:      "JSONP"
date:       2017-07-30 13:21:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JSONP
---

> “Yeah It's on. ”
>引用：
>https://tonghuashuo.github.io/blog/jsonp.html

## 正文
[网页链接](https://www.runoob.com/json/json-jsonp.html)

Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。
为什么我们从不同的域（网站）访问数据需要一个特殊的技术(JSONP )呢？这是因为同源策略。
同源策略，它是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript 的浏览器都会使用这个策略。
```
$.ajax({
  url: "http://tonghuashuo.github.io/test/jsonp.txt",
  dataType: 'jsonp',
  jsonp: "callback",
  jsonpCallback: "dosomething"
})
.done(function(res) {
  console.log("success");
  console.log(res);
})
.fail(function(res) {
  console.log("error");
  console.log(res);
});
```
后端关键代码（以PHP为例）
```
$result   = "{'data':'JSONP Works'}"; // 这里省略了数据库查询等操作，直接给出返回值
$callback = $_GET['callback'];        // 最好加上判空和默认值，以防拿不到参数
echo $callback."(".$result.")";

// 返回的结果
// dosomething({"data":"JSONP Works"});
```
将上述代码放到你本地localhost中，尝试运行一下，顺利的话应该会在浏览器的控制台中得到以下的内容：
> success
> Object {data: "JSONP Works"}

实际发送出来的完整请求长这样：`http://tonghuashuo.github.io/test/jsonp.txt?callback=dosomething&_=1471419449018。`后面的随机字符串是jQuery加上的。

区别于常规的 AJAX 请求，这里真正需要关心的参数有以下 3 个：
* dataType: 'jsonp'，用于表示这是一个 JSONP 请求。
* jsonp: 'callback'，用于告知服务器根据这个参数获取回调函数的名称，通常约定就叫 callback。
* jsonpCallback:'dosomething'，回调函数的名称，也是前面callback参数的值。

其中jsonpCallback参数是可以省略的，jQuery 会自动生成一个随机字符串作为函数名，推荐这么做，以减少不必要的命名工作，同时排除潜在的安全隐患。
```
$.ajax({
  url: "http://tonghuashuo.github.io/test/jsonp.txt",
  dataType: 'jsonp',
  jsonp: "callback"
})

// 这样会发出如下结构的请求
// http://tonghuashuo.github.io/test/jsonp.txt?callback=jQuery31008590081461589807_1471506026601&_=1471506026602
// 可以看到 jQuery 自动创建了一个随机字符串作为 callback 参数的值
```
jQuery 还支持将jsonp设置为false以避免callback参数出现在请求 URL 中，但这需要前后端配合，前端必须要指定jsonpCallback的值为一个函数名，后端由于无法从请求中获取回调函数的名称，因此也必须固定使用同名的字符串进行拼接。
```
$.ajax({
  url: "http://tonghuashuo.github.io/test/jsonp.txt",
  dataType: 'jsonp',
  jsonp: false,
  jsonpCallback: "myCallback"
})

// 这样会发出如下结构的请求
// http://tonghuashuo.github.io/test/jsonp.txt?_=1471506026602
// 可以看到 callback 参数被隐藏了，单从 URL 上看不容易看出这是一个 JSONP 请求
// 后端也无法从请求中获取回调函数名，因此必须事先约定好回调函数名，例如大家都使用 myCallback
```
后台接收到该请求后会做两件事，一是照常去获取请求的资源，构造 JSON 形式的返回内容，二是根据请求 url 中的 callback 参数（由 $.ajax() 中的 jsonp 参数指定）的值，以字符串拼接的方式，构造出一个“JavaScript函数调用”的字符串，将准备返回的JSON作为实参放入括号中，由于最终返回的是纯字符串，因此和后端所用技术无关。

响应内容传回前台后，jQuery会自动接管，将其中JSON的部分剥离出来传给success()和error()，在这两个函数中可以直接读取JSON的内容，换句话说，无需实现doSomething()也可以拿到数据，当然如果你还是实现了doSomething()，它会在success()之前被调用。

### 纯 JavaScript 实现 JSONP
利用 jQuery 我们虽然完成了 JSONP 跨域请求，但 JSONP 本质并不是 AJAX，jQuery 将其包含在 $.ajax() 误导了不少人。为了更好的理解 JSONP，我们来用纯 JavaScript 实现一遍。

```
<script>
  // 实现回调函数，这里没有了 jQuery 的封装，必须手动指定并实现
  var dosomething = function(data){
      console.log(data);
  };

  // 提供 JSONP 服务的 URL 地址，查询字符串中加入 callback 指定回调函数
  var url = "tonghuashuo.github.io/test/jsonp.txt?callback=docomething";

  // 创建 <script> 标签，设置其 src 属性
  var script = document.createElement('script');
  script.setAttribute('src', url);

  // 把 <script> 标签加入 <body> 尾部，此时调用开始。
  document.getElementsByTagName('body')[0].appendChild(script);

  // 因为目标 URL 是一个后台脚本，访问后会被执行，返回的 JSON 被包裹在回调函数中以字符串的形式被返回。
  // 返回的字符串放入 <script> 中就成为了一个普通的函数调用，执行回调函数，返回的 JSON 数据作为实参被传给了回调函数。
</script>
```

### JSONP 的原理
AJAX 无法跨域是受到“同源政策”的限制，但是带有src属性的标签（例如`<script>、<img>、<iframe>`）是不受该政策限制的，因此我们可以通过向页面中动态添加`<script>`标签来完成对跨域资源的访问，这也是 JSONP 方案最核心的原理。

通常我们使用`<script>`都是引用的静态资源（主要是 js 文件），其实它也可以用来引用动态资源（php、jsp、aspx等），后台服务被访问后返回一个“JavaScript函数调用”形式的字符串，由于是字符串，因此在后台的时候不会起到任何作用，但到了前台，放入`<script>`标签之内，就成了一个合法的 JavaScript 函数调用，实参是我们真正需要的数据，被调用的回调函数也已经实现了，因此就会顺利的被调用。

再次强调：JSONP 不是 AJAX，了解了它的原理之后你应该已经明白这是为什么了（事实上 JSONP 的出现让 “AJAX跨域请求”变成了伪命题，跨域的过程根本就没 AJAX 什么事）。要怪就怪 jQuery，给不明真相的吃瓜群众带来了误解。当然 jQuery 这么做也不无道理，毕竟跨域的问题是在 AJAX 中遇到的，受惯性思维影响我们自然首先会从 AJAX 的角度去寻求解决方案，因此 jQuery 才把 JSONP 封装到了$.ajax()的配置项中，至于具体的实现自然还是上面提到的方法。

回过头来我们再看一遍 JSONP 的全称：JSON with Padding，这里的 Padding 指的就是包裹在 JSON 外层的回调函数，这么一来，是不是印象就非常深刻了呢。

### JSONP 的优缺点

JSONP 最大的优点就是兼容性非常好，其原理决定了即便在非常古老的浏览器上也能够很好的被实现。

JSONP 的主要缺点有两个，一是只能 GET 不能 POST，因为是通过`<script>`引用的资源，参数全都显式的放在URL里，和 AJAX 没有半毛钱关系。二是存在安全隐患，动态插入`<script>`标签其实就是一种脚本注入，XSS听过没？需要多留个心眼。

