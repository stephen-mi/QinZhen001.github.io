---
layout:     post
title:      "slice()一层浅复制"
date:       2017-12-19 21:44:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - JavaScript
---

> “Talk is cheap , show me the code. ”


## slice()


[网页链接](https://www.zhihu.com/question/56690271?sort=created)


只是一层复制
遇到非基本类型只是简单赋值引用
并没有递归
是浅复制

### 源码

```
function ArraySlice(start, end) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.slice");

  var array = TO_OBJECT(this);
  var len = TO_LENGTH(array.length);
  var start_i = TO_INTEGER(start);
  var end_i = len;

  if (!IS_UNDEFINED(end)) end_i = TO_INTEGER(end);

  if (start_i < 0) {
    start_i += len;
    if (start_i < 0) start_i = 0;
  } else {
    if (start_i > len) start_i = len;
  }

  if (end_i < 0) {
    end_i += len;
    if (end_i < 0) end_i = 0;
  } else {
    if (end_i > len) end_i = len;
  }

  var result = ArraySpeciesCreate(array, MaxSimple(end_i - start_i, 0));

  if (end_i < start_i) return result;

  if (UseSparseVariant(array, len, IS_ARRAY(array), end_i - start_i)) {
    %NormalizeElements(array);
    if (IS_ARRAY(result)) %NormalizeElements(result);
    SparseSlice(array, start_i, end_i - start_i, len, result);
  } else {
    SimpleSlice(array, start_i, end_i - start_i, len, result);
  }

  result.length = end_i - start_i;

  return result;
}

function SimpleSlice(array, start_i, del_count, len, deleted_elements) {
  for (var i = 0; i < del_count; i++) {
    var index = start_i + i;
    if (index in array) {
      var current = array[index];
      %CreateDataProperty(deleted_elements, i, current);
    }
  }
}
```

### 代码证明
```
const a = [1, 2, 3]
const b = a
a === b // true
```

```
const a = [1, 2, 3]
const b = a.slice(0)
a === b // false
```

```
const a = [{ prop: 1 }, { prop: 2 }]
const b = a.slice(0)
a === b // false
a[0] === b[0] // true
```
可以很清晰地看出：只有第一层是深拷贝


