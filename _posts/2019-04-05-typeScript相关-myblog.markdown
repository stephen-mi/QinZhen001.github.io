---
layout:     post
title:      "typeScript相关"
date:       2019-04-05 14:10:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - TypeScript
---

> “Yeah It's on. ”


## 正文


### tsconfig.json

如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。




tsconfig.json示例文件:

```javascript
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
}
```





使用"include"和"exclude"属性



```javascript
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

[配置的项解释](https://www.cnblogs.com/gina/p/8960754.html)

### 集成在Webpack

```javascript
npm install ts-loader --save-dev
```


基本webpack.config.js


```javascript
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};
```

[或者awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)


## 补充

### awesome-typescript-loader

**Differences between ts-loader**




awesome-typescript-loader loader was created mostly to speed-up compilation in my own projects. Some of them are quite big and I wanted to have full control on how my files are compiled. There are two major points:

1. atl has first-class integration with Babel and enables caching possibilities. This can be useful for those who use Typescript with Babel. When useBabel and useCache flags are enabled, typescript's emit will be transpiled with Babel and cached. So next time if source file (+environment) has the same checksum we can totally skip typescript's and babel's transpiling. This significantly reduces build time in this scenario.
2. atl is able to fork type-checker and emitter to a separate process, which also speeds-up some development scenarios (e.g. react with react-hot-loader) So your webpack compilation will end earlier and you can explore compiled version in your browser while your files are typechecked.


--- 

1. atl与Babel有一流的集成，可以实现缓存。这对于使用带有Babel的Typescript的人来说非常有用。当启用useBabel和useCache标志时，typescript的emit将使用Babel进行转换并缓存。所以下次如果源文件（+环境）具有相同的校验和，我们可以完全跳过typescript和babel的转换。这大大减少了此方案中的构建时间。
2. atl能够将类型检查器和发射器分叉到一个单独的进程，这也加快了一些开发方案（例如与react-hot-loader的反应）所以你的webpack编译将提前结束，你可以在浏览器中探索编译版本你的文件是typechecked








