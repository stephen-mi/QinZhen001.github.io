---
layout:     post
title:      "splice() 方法"
date:       2017-07-25 13:25:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Yeah It's on. ”


## 正文
[网页链接](http://www.w3school.com.cn/jsref/jsref_splice.asp)

#### 定义和用法
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
注释：该方法会改变原始数组。
#### 语法
arrayObject.splice(index,howmany,item1,.....,itemX)

* index	
  必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
* howmany	
   必需。要删除的项目数量。如果设置为 0，则不会删除项目。
* item1, ..., itemX	
   可选。向数组添加的新项目。
#### 返回值
Array	包含被删除项目的新数组，如果有的话。
#### 说明
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。


---

## 补充
在本例中，我们将创建一个新数组，并向其添加一个元素：
```
<script type="text/javascript">

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,0,"William")
document.write(arr + "<br />")

</script>
输出：
George,John,Thomas,James,Adrew,Martin
George,John,William,Thomas,James,Adrew,Martin
```
在本例中我们将删除位于 index 2 的元素，并添加一个新元素来替代被删除的元素：
```
<script type="text/javascript">

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,1,"William")
document.write(arr)

</script>
输出：
George,John,Thomas,James,Adrew,Martin
George,John,William,James,Adrew,Martin
```



### 在for循环中使用可能会遇到的坑

[https://blog.csdn.net/a727911438/article/details/55224532](https://blog.csdn.net/a727911438/article/details/55224532)

```
    var arr = new Array(1, 2, 3, 4, 5);     //初始化数字集合  
    var delete_number = 3;    //要被删除的数字  
      
    //遍历数组  
    for(var i=0; i<arr.length; i++){  
        if(arr[i] === delete_number){   //如果找到要被删除的数字所在的数组下标  
            var num = arr.splice( i, 1 );   //从i位置开始删除1个数字  
            console.log("成功删除 "+num);    //输出被删除的数字  
        }  
        else{  
            console.log(arr[i]+" 未被删除");    //如果i下标的数组元素不是需要被删除的数字，就输出数字  
        }  
    }  
```
输出
```
1 未被删除
2 未被删除
成功删除 3
5 未被删除
```

splice 是直接操作并修改数组的，所以当找到数字3时在循环中的 i 下标是2，而当删除数字3后，数组下标 i 位置中保存的数字变为了数字4，然后到了下一个循环 i 下标为3时，数组下标 i 位置中保存的数字是5，所以跳过了数字4


**解决方案**

```
    if(arr[i] === delete_number){   //如果找到要被删除的数字所在的数组下标  
        var num = arr.splice( i, 1 );   //从i位置开始删除1个数字  
        console.log("成功删除 "+num);    //输出被删除的数字  
          
        i = i-1;    //解决方案  
    }  
```
或者

**采用逆循环的方式**

```
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === delete_number) {   //如果找到要被删除的数字所在的数组下标
            var num = arr.splice(i, 1);   //从i位置开始删除1个数字
            console.log("成功删除 " + num);    //输出被删除的数字
        }
        else {
            console.log(arr[i] + " 未被删除");    //如果i下标的数组元素不是需要被删除的数字，就输出数字
        }
    }
```