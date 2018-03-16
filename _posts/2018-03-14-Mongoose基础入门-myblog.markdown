---
layout:     post
title:      "Mongoose基础入门"
date:       2018-03-14 19:15:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 数据库
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm_source=itdadao&utm_medium=referral)

Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。本文将详细介绍如何使用Mongoose来操作MongoDB


### NodeJS驱动
首先，安装mongodb

`npm install mongodb`

接着，使用require()方法引入mongodb数据库；然后使用MongoClient对象的connect()方法连接mongodb；最后通过node来对mongodb进行异步的增删改查

在mongodb数据库中建立db1数据库，然后通过以下代码，建立col集合，并插入{"a":1}文档

```
var mongodb = require('mongodb');
mongodb.MongoClient.connect("mongodb://localhost/db1",function(err,db){
    if(!err){
        db.collection("col").insert({"a":1},function(err,result){
            if(!err){
                console.log(result);
            }
        })
    }
})
```

最后返回结果如下
```
{ result: { ok: 1, n: 1 },
  ops: [ { a: 1, _id: 597077dc271d092728caa362 } ],
  insertedCount: 1,
  insertedIds: [ 597077dc271d092728caa362 ] }
```


### 概述
Mongoose是NodeJS的驱动，不能作为其他语言的驱动。Mongoose有两个特点
1. 通过关系型数据库的思想来设计非关系型数据库
2. 基于mongodb驱动，简化操作



![enter description here][1]

　Mongooose中，有三个比较重要的概念，分别是Schema、Model、Entity。**它们的关系是：Schema生成Model，Model创造Document，Model和Document都可对数据库操作造成影响，但Model比Document更具操作性**

* Schema用于定义数据库的结构。类似创建表时的数据定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个Schema会映射到mongodb中的一个collection，Schema不具备操作数据库的能力
* Model是由Schema编译而成的构造器，具有抽象属性和行为，可以对数据库进行增删查改。Model的每一个实例（instance）就是一个文档document
* Document是由Model创建的实体，它的操作也会影响数据库


### 安装
安装nodejs和mongodb之后 ，使用npm来安装mongoose

`npm install mongoose`

安装成功后，就可以通过 require('mongoose') 来使用


### 连接数据库
使用require()方法在项目中包含mongoose后，接下来使用connect()方法连接到MongoDB数据库
　
mongoose.connect(url);
connect()最简单的使用方式，就是只要传入url参数即可，如下所示。连接到本地localhost的db1服务器　
`mongoose.connect('mongodb://localhost/db1');`

如果还需要传递用户名、密码，则可以使用如下方式
```
mongoose.connect('mongodb://username:password@host:port/database?options...');
```

　connect()方法还接受一个选项对象options，该对象将传递给底层驱动程序。这里所包含的所有选项优先于连接字符串中传递的选项
　
mongoose.connect(uri, options);
db            -数据库设置
 server        -服务器设置
 replset       -副本集设置
 user          -用户名
 pass          -密码
 auth          -鉴权选项
 mongos        -连接多个数据库
 promiseLibrary
 
```
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'myUserName',
  pass: 'myPassword'
}
mongoose.connect(uri, options);
```

如果要连接多个数据库，只需要设置多个url以,隔开，同时设置mongos为true

```
mongoose.connect('urlA,urlB,...', {
   mongos : true 
})
```


　connect()函数还接受一个回调参数
```
mongoose.connect(uri, options, function(error) {

});
```
执行下列代码后，控制台输出“连接成功”

```
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
```
 　　如果开启鉴权控制，以用户名"u1"，密码"123456"登录'db1'数据库。执行代码后，控制台输出“连接成功”

```
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
```


### mongoose.disconnect()
使用disconnect()方法可以断开连接
```
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
setTimeout(function(){
    mongoose.disconnect(function(){
        console.log("断开连接");
    })
}, 2000);
```

### Schema
Schema主要用于定义MongoDB中集合Collection里文档document的结构　　
定义Schema非常简单，指定字段名和类型即可，支持的类型包括以下8种

```
String      字符串
Number      数字    
Date        日期
Buffer      二进制
Boolean     布尔值
Mixed       混合类型
ObjectId    对象ID    
Array       数组
```
通过mongoose.Schema来调用Schema，然后使用new方法来创建schema对象
```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```
创建Schema对象时，声明字段类型有两种方法，一种是首字母大写的字段类型，另一种是引号包含的小写字段类型

```
var mySchema = new Schema({title:String, author:String});
//或者 
var mySchema = new Schema({title:'string', author:'string'});
```


　如果需要在Schema定义后添加其他字段，可以使用add()方法
　
　
```
var MySchema = new Schema;
MySchema.add({ name: 'string', color: 'string', price: 'number' });
```


### Model
模型Model是根据Schema编译出的构造器，或者称为类，通过Model可以实例化出文档对象document

文档document的创建和检索都需要通过模型Model来处理

使用model()方法，将Schema编译为Model。model()方法的第一个参数是模型名称

>一定要将model()方法的第一个参数和其返回值设置为相同的值，否则会出现不可预知的结果

　　Mongoose会将集合名称设置为模型名称的小写版。如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；如果模型名称为"Model1"，则集合名称为"model1"
　　
### 实例化文档document　　
通过对原型Model1使用new方法，实例化出文档document对象　


```
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
        var schema = new mongoose.Schema({ num:Number, name: String, size: String});
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ size: 'small' });
        console.log(doc1.size);//'small'
    }
});
```
　　
### 文档保存　　
通过new Model1()创建的文档doc1，必须通过save()方法，才能将创建的文档保存到数据库的集合中，集合名称为模型名称的小写复数版　　
　　
回调函数是可选项，第一个参数为err，第二个参数为保存的文档对象
save(function (err, doc) {})`
　　
　　
　　
```
var mongoose = require('mongoose');
mongoose.connect("mongodb://u1:123456@localhost/db1", function(err) {
    if(!err){
        var schema = new mongoose.Schema({ num:Number, name: String, size: String });
        var MyModel = mongoose.model('MyModel', schema);
        var doc1 = new MyModel({ size: 'small' });
        doc1.save(function (err,doc) {
        //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
          console.log(doc);
        })
    }
});
```


由下图所示，db1数据库中的集合名称为mymodels，里面有一个`{size:"small"}`的文档


![enter description here][2]





















  [1]: https://images2015.cnblogs.com/blog/740839/201707/740839-20170721123112068-7289503.jpg
  [2]: https://images2015.cnblogs.com/blog/740839/201707/740839-20170721003232802-1510769411.png