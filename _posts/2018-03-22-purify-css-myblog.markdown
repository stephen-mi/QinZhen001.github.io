---
layout:     post
title:      "purify-css"
date:       2017-07-28 22:54:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Other
---

> “Yeah It's on. ”


## 正文
[网页链接](https://www.npmjs.com/package/purify-css)

A function that takes content (HTML/JS/PHP/etc) and CSS, and **returns only the used CSS**.
PurifyCSS does not modify the original CSS files. You can write to a new file, like minification.
If your application is using a CSS framework, this is especially useful as many selectors are often unused.


### Potential reduction
* Bootstrap file: ~140k
* App using ~40% of selectors.
* Minified: ~117k
* Purified + Minified: ~35k


### Usage
Standalone

 Share your code. npm Orgs help your team discover, share, and reuse code. Create a free org »
purify-csspublic

Travis npm David Join the chat at https://gitter.im/purifycss/purifycss

A function that takes content (HTML/JS/PHP/etc) and CSS, and returns only the used CSS.
PurifyCSS does not modify the original CSS files. You can write to a new file, like minification.
If your application is using a CSS framework, this is especially useful as many selectors are often unused.
Potential reduction

    Bootstrap file: ~140k
    App using ~40% of selectors.
    Minified: ~117k
    Purified + Minified: ~35k

Usage
Standalone

Installation

`npm i -D purify-css`

```
import purifycss from "purify-css"
const purifycss = require("purify-css")
 
let content = ""
let css = ""
let options = {
    output: "filepath/output.css"
}
purify(content, css, options)
```


----------


Grunt
Gulp
Webpack

在这三个中都可以使用


----------


### **PurifyCSS for Webpack**
purifycss-webpack

[https://github.com/webpack-contrib/purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)

Install
```
npm i -D purifycss-webpack purify-css
```
Usage

Configure as follows:
```
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: {...},
  output: {...},
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'app/*.html')),
    })
  ]
};
```










