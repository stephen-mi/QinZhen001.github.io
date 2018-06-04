---
layout:     post
title:      "webpack中的plugin"
date:       2018-05-19 15:34:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文

### CommonsChunkPlugin
CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。

>The CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunk，请查看 SplitChunksPlugin。 



通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

`new webpack.optimize.CommonsChunkPlugin(options)`

**配置**

```
{
  name: string, // or
  names: string[],
  // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
  // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
  // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，
  // 否则 `options.filename` 会用于作为 chunk 名。
  // When using `options.async` to create common chunks from other async chunks you must specify an entry-point
  // chunk name here instead of omitting the `option.name`.

  filename: string,
  // common chunk 的文件名模板。可以包含与 `output.filename` 相同的占位符。
  // 如果被忽略，原本的文件名不会被修改(通常是 `output.filename` 或者 `output.chunkFilename`)。
  // This option is not permitted if you're using `options.async` as well, see below for more details.

  minChunks: number|Infinity|function(module, count) -> boolean,
  // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
  // 数量必须大于等于2，或者少于等于 chunks的数量
  // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
  // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）

  chunks: string[],
  // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
  // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。

  children: boolean,
  // 如果设置为 `true`，所有公共 chunk 的子模块都会被选择

  deepChildren: boolean,
  // 如果设置为 `true`，所有公共 chunk 的后代模块都会被选择

  async: boolean|string,
  // 如果设置为 `true`，一个异步的  公共chunk 会作为 `options.name` 的子模块，和 `options.chunks` 的兄弟模块被创建。
  // 它会与 `options.chunks` 并行被加载。
  // Instead of using `option.filename`, it is possible to change the name of the output file by providing
  // the desired string here instead of `true`.

  minSize: number,
  // 在 公共chunk 被创建立之前，所有 公共模块 (common module) 的最少大小。
}
```

### extract-text-webpack-plugin
Extract text from a bundle, or bundles, into a separate file.(提取文本到单独的文件)

```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}
```

它将*.css输入块中的所有必需模块移动到单独的CSS文件中。所以你的样式不再被内联到JS包中，而是在一个单独的CSS文件（styles.css）中。如果您的样式表总量很大，那么它会更快，因为CSS包与JS包并行加载。



#### Options
**allChunks 	{Boolean}** 

Extract from all additional chunks too (by default it extracts only from the initial chunk(s))
When using CommonsChunkPlugin and there are extracted chunks (from ExtractTextPlugin.extract) **in the commons chunk, allChunks must be set to true**


----------


**filename	{String\|Function}**


结果文件的名称。可能含有[name]，[id]和[contenthash]

* [name] name of the chunk
* [id] number of the chunk
* [contenthash] hash of the content of the extracted file(提取文件内容的散列)
* [<hashType>:contenthash:<digestType>:<length>] 您可以选择配置
  * other hashTypes, e.g. sha1, md5, sha256, sha512
  * ther digestTypes, e.g. hex, base26, base32, base36, base49, base52, base58, base62, base64
  * and length, the length of the hash in chars



#### #extract
ExtractTextPlugin.extract(options: loader | object)

Creates an extracting loader from an existing loader


----------


options.use	  **{String}/ {Array}/{Object}**

应该用于将资源转换为CSS导出模块的加载程序（必需）


----------


options.fallback	**{String}/ {Array}/{Object}**

加载器（例如'style-loader'），当CSS没有被提取时应该被使用（例如在一个额外的块中allChunks: false）


----------


options.publicPath	{String}

覆盖publicPath此加载器的设置


----------


### html-webpack-plugin
Plugin that simplifies creation of HTML files to serve your bundles(简化创建HTML文件)

这是一个webpack插件，它可以简化创建HTML文件来为你的webpack包提供服务。这对于webpack在文件名中包含散列的bundle 来说尤其有用，它可以改变每个编译。您可以让插件为您生成一个HTML文件，使用lodash模板提供您自己的模板或使用您自己的加载器。



The html-webpack-plugin provides **hooks** to extend it to your needs.


The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags. Just add the plugin to your webpack config as follows:



webpack.config.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
 
module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
```
This will generate a file dist/index.html containing the following
```css
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script> 
  </body>
</html>
```















