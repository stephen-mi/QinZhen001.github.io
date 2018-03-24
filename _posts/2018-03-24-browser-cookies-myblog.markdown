---
layout:     post
title:      "browser-cookies"
date:       2018-03-24 22:48:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.npmjs.com/package/browser-cookies)


Tiny cookies library for the browser

### Features
* Clean and easy to use API
* Small footprint (minified and gzipped ~ 0.5kB)
* No dependencies
* RFC6265 compliant
* Cross browser support
* Supports CommonJS (e.g. Browserify)


### Installation
Using NPM
`npm install browser-cookies`


### Usage
```
var cookies = require('browser-cookies');
 
cookies.set('firstName', 'Lisa');
cookies.set('firstName', 'Lisa', {expires: 365}); // Expires after 1 year
cookies.set('firstName', 'Lisa', {secure: true, domain: 'www.example.org'});
 
cookies.get('firstName'); // Returns cookie value (or null)
 
cookies.erase('firstName'); // Removes cookie
```


### API
API contents:
* method cookies.set(name, value [, options])
* method cookies.get(name)
* method cookies.erase(name, [, options])
* method cookies.all()
* property cookies.defaults





