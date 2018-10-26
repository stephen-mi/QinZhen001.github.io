---
layout:     post
title:      "Git操作学习"
date:       2018-09-23 23:06:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Git
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)


### 本地分支与远程分支

github上已经有master分支 和dev分支

在本地

* git checkout -b dev 新建并切换到本地dev分支
* git pull origin dev 本地分支与远程分支相关联


----------



本地新建分支并推送到远程


* git checkout -b test
* git push origin test   这样远程仓库中也就创建了一个test分支



### 拉取远程分支并创建本地分支
git fetch origin 远程分支名x:本地分支名x

使用该方式会在本地新建分支x，但是不会自动切换到该本地分支x，需要手动checkout。


**重要：采用此种方法建立的本地分支不会和远程分支建立映射关系。**



### 查看本地分支与远程分支的映射关系
[https://blog.csdn.net/tterminator/article/details/78108550](https://blog.csdn.net/tterminator/article/details/78108550)
使用以下命令（注意是双v）：

git branch -vv

```
$ git branch -vv
  2.1.0  2ca33c8c 提交
* master aeb60f00 [origin/master] 提交
```

可以看到分支2.1.0没有和远程分支建立任何映射，此时若执行如下拉取命令则不成功（因为git此时不知道拉取哪个远程分支和本地分支合并）


### 建立当前分支与远程分支的映射关系

git branch -u origin/addFile

或者使用命令：

git branch --set-upstream-to origin/addFile



**此时git pull再次拉取，成功**


### 撤销本地分支与远程分支的映射关系

git branch --unset-upstream