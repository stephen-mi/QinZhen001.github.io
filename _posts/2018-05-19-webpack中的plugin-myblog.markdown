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


## 前文

[https://www.webpackjs.com/concepts/plugins/#%E5%89%96%E6%9E%90](https://www.webpackjs.com/concepts/plugins/#%E5%89%96%E6%9E%90)



插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！

插件目的在于解决 loader 无法实现的其他事。


--------------------


**剖析**

webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

>compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中复用。





下面提一下，一些用过的比较重要的插件


## 正文

### CommonsChunkPlugin
[https://zhuanlan.zhihu.com/p/26710831?refer=ElemeFE](https://zhuanlan.zhihu.com/p/26710831?refer=ElemeFE)

CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。

>The CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunk，请查看 SplitChunksPlugin。 



通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。



 vendor chunk 里面包含了 webpack 的 runtime 代码（用来解析和加载模块之类的运行时代码）,这样会导致vendor打包的hash值一直在改变，所以要把runtime 代码提取出来
 
```javascript
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
```

新版vue-cli中的webpack配置
```javascript
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        //模块是来自 node_modules 目录的
        //都移到 vendor chunk 里去
        return (
          module.resource &&
          /\.(js|vue|styl|ttf|woff)$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
```

用到 minChunks想把所有 node_modules 目录下的所有 .js 都自动分离到 vendor.js


----------


为了Dynamic Import时抽取出一些chunk中共有的模块，我们需要用到 CommonsChunkPlugin 的 async  (上面就是一个很好的例子)

```javascript
// webpack.config.js

new webpack.optimize.CommonsChunkPlugin({
  async: 'common-in-lazy',  //抽取出来的chunk的名字
  minChunks: ({ resource } = {}) => (
    resource &&
    resource.includes('node_modules') &&
    /axios/.test(resource)
  ),
}),
```

Webpack在所有的 async chunk 中，找到来自 node_modules ，并且名字带有 axios 的模块。



>例子Emoji.chunk.js 和 Photos.chunk.js 都包含了 axios ，所以把他移动到名叫 common-in-lazy 的 chunk 中(如果common-in-lazy chunk 并不存在，那就新建一个吧)


**所有的 async chunk ，就是 import() 产生的 chunk**




### mini-css-extract-plugin
**This plugin extracts CSS into separate files.**


 It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.



**It builds on top of a new webpack v4 feature (module types) and requires webpack 4 to work.**



(与extract-text-webpack-plugin相比：)
Compared to the extract-text-webpack-plugin:


* Async loading (异步加载)
* No duplicate compilation (performance)               没有重复的编译（性能）
* Easier to use  更容易使用
* Specific to CSS  特定于CSS


```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  }
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
```html
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



--------



[https://www.jianshu.com/p/08a60756ffda](https://www.jianshu.com/p/08a60756ffda)

```
let srcPath = path.resolve(__dirname, '../src')
let icoPath = path.resolve(srcPath, 'common/images/favicon.ico')




  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: 'index.html',
      favicon: icoPath
    }),
  ]
```


----------------


 **title属性不起作用**
 
 
 
[https://segmentfault.com/q/1010000004555431](https://segmentfault.com/q/1010000004555431)



 
应该是webpack.config.js的配置文件里面加了 html-loader，加了之后会正常解析html文件作为模版，就会直接把 `<%= htmlWebpackPlugin.options.title %>`解析成字符串。如果有html-loader ,去掉就可以了







### HashedModuleIdsPlugin 
[https://zhuanlan.zhihu.com/p/27710902](https://zhuanlan.zhihu.com/p/27710902)


![enter description here][1]

keep module.id stable when vender modules does not change


webpack 里每个模块都有一个 module id ，module id 是该模块在模块依赖关系图里按顺序分配的序号，如果这个 module id 发生了变化，那么他的 chunkhash 也会发生变化。


HashedModuleIdsPlugin是根据模块所在路径来映射其 module id ，这样就算引入了新的模块，也不会影响 module id 的值，只要模块的路径不改变的话。

```javascript
// webpack.config.js

plugins: [
  new webpack.HashedModuleIdsPlugin(),
  // ...
],
```



**这样修改了某个模块的代码，就不会破坏其他模块的缓存，这就是我们想要实现的持久性缓存**

```
                    Asset       Size  Chunk Names
common-in-lazy.fbe5ebcb.chunk.js    11.9 kB  common-in-lazy
    used-twice.166ea824.chunk.js    17.2 kB  used-twice
        Photos.c2430756.chunk.js    8.66 kB  Photos
         Emoji.96ddcf33.chunk.js     1.2 kB  Emoji
                 app.6dd02fc7.js    2.81 kB  app
              vendor.794774d5.js     103 kB  vendor
            manifast.31b01d25.js    1.54 kB  manifast
```

只有正真代码变化的模块hash值才会改变






### CopyWebpackPlugin
将单个文件或整个目录复制到构建目录

webpack.config.js
```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin')
 
const config = {
  plugins: [
    new CopyWebpackPlugin([ ...patterns ], options)
  ]
}
```

#### Patterns

A simple pattern looks like this
```
{ from: 'source', to: 'dest' }
```

Or, in case of just a from with the default destination, you can also use a {String} as shorthand instead of an {Object}

```
'source'
```


### BundleAnalyzerPlugin 

使用交互式可缩放树形图可视化webpack输出文件的大小。

```javascript
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

This module will help you:

1. Realize what's really inside your bundle
2. Find out what modules make up the most of its size
3. Find modules that got there by mistake
4. Optimize it!




And the best thing is it supports minified bundles! It parses them to get real size of bundled modules. And it also shows their gzipped sizes!




### HashedModuleIdsPlugin



```javascript
 // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
```


增加、删除一些模块，可能会导致不相关文件的 hash 发生变化，这是因为 webpack 打包时，按照导入模块的顺序，module.id 自增，会导致某些模块的 module.id 发生变化，进而导致文件的 hash 变化。


解决方式： 使用 webpack 内置的 HashedModuleIdsPlugin，该插件基于导入模块的相对路径生成相应的 module.id，这样如果内容没有变化加上 module.id 也没变化，则生成的 hash 也就不会变化了。




### NamedModulesPlugin

[https://www.jianshu.com/p/8499842defbe](https://www.jianshu.com/p/8499842defbe)

当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。

```javascript
new webpack.NamedModulesPlugin()
```




### NoEmitOnErrorsPlugin 

[https://segmentfault.com/q/1010000013357755/a-1020000013363200](https://segmentfault.com/q/1010000013357755/a-1020000013363200)

在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。





### webpack-dev-middleware

[https://segmentfault.com/a/1190000011761306](https://segmentfault.com/a/1190000011761306)





我们在使用webpack 编译文件时，每次改动文件都要去重新编译，是不是很麻烦，这时候我们就用到了webpack-dev-middleware 插件，该插件对更改的文件进行监控，编译, 一般和 webpack-hot-middleware 配合使用，实现热加载功能






  [1]: https://pic2.zhimg.com/80/v2-5a4b6bef5809e00512873d481a3670e7_hd.jpg