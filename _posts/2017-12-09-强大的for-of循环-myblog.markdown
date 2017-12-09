---
layout:     post
title:      "强大的for-of循环"
date:       2017-12-09 18:41:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - ES6
---

> “Yeah It's on. ”


## 正文


[网页链接](http://www.infoq.com/cn/articles/es6-in-depth-iterators-and-the-for-of-loop)


自ES5正式发布后，你可以使用内建的forEach方法来遍历数组：
```
myArray.forEach(function (value) {
console.log(value);
});
```
这段代码看起来更加简洁，但这种方法也有一个小缺陷：你不能使用break语句中断循环，也不能使用return语句返回到外层函数。

### for-in循环
```
for (var index in myArray) { // 千万别这样做
  console.log(myArray[index]);
}
```
这绝对是一个糟糕的选择，为什么呢？

* 在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
* 作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。举个例子，如果你的数组中有一个可枚举属性`myArray.name`，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。
* 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
* 简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。

### 强大的for-of循环
```
for (var value of myArray) {
  console.log(value);
}
```

是的，与之前的内建方法相比，这种循环方式看起来是否有些眼熟？那好，我们将要探究一下for-of循环的外表下隐藏着哪些强大的功能。现在，只需记住：

* 这是最简洁、最直接的遍历数组元素的语法
* 这个方法避开了for-in循环的所有缺陷
* 与forEach()不同的是，它可以正确响应break、continue和return语句


**for-in循环用来遍历对象属性。
for-of循环用来遍历数据 — 例如数组中的值。**

### for-of循环也可以遍历其它的集合

for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。

for-of循环也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历：
```
for (var chr of "") {
  alert(chr);
}
```

它同样支持Map和Set对象遍历

举个例子，Set对象可以自动排除重复项：
```
// 基于单词数组创建一个set对象
var uniqueWords = new Set(words);
生成Set对象后，你可以轻松遍历它所包含的内容：
for (var word of uniqueWords) {
   console.log(word);
}
```

Map对象稍有不同：内含的数据由键值对组成，所以你需要使用解构（destructuring）来将键值对拆解为两个独立的变量：

```
for (var [key, value] of phoneBookMap) {
   console.log(key + "'s phone number is: " + value);
}
```
for-of就是为遍历所有这些集合特别设计的循环语句。

**但是for-of循环不支持普通对象**

如果你想迭代一个对象的属性，你可以用for-in循环（这也是它的本职工作）或内建的Object.keys()方法：

```
// 向控制台输出对象的可枚举属性
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```
