---
layout:     post
title:      "postcss-loader的plugin"
date:       2018-03-21 23:26:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Webpack
---

> “Yeah It's on. ”


## 正文

### postcss-sprite
[https://www.npmjs.com/package/postcss-sprites](https://www.npmjs.com/package/postcss-sprites)

[https://github.com/2createStudio/postcss-sprites](https://github.com/2createStudio/postcss-sprites)


PostCSS plugin that generates spritesheets from your stylesheets.

```
/* Input */
.comment { background: url(images/sprite/ico-comment.png) no-repeat 0 0; }
.bubble { background: url(images/sprite/ico-bubble.png) no-repeat 0 0; }
 
/* ---------------- */
 
/* Output */
.comment { background-image: url(images/sprite.png); background-position: 0 0; }
.bubble { background-image: url(images/sprite.png); background-position: 0 -50px; }
```

Share your code. npm Orgs help your team discover, share, and reuse code. Create a free org »
postcss-spritespublic

PostCSS plugin that generates spritesheets from your stylesheets.
```
/* Input */
.comment { background: url(images/sprite/ico-comment.png) no-repeat 0 0; }
.bubble { background: url(images/sprite/ico-bubble.png) no-repeat 0 0; }
 
/* ---------------- */
 
/* Output */
.comment { background-image: url(images/sprite.png); background-position: 0 0; }
.bubble { background-image: url(images/sprite.png); background-position: 0 -50px; }
```

```
         {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: [
                                        // CSS 雪碧图
                                        require('postcss-sprites')({
                                            spritePath: 'dist/assets/imgs/sprites',
                                            retina: true
                                        }),
                                        require('postcss-cssnext')()
                                    ]
                                }
                            }
```


适配retina屏幕(2倍大小图片等)
retina: true




### postcss-import



### postcss-url



### postcss-assets






































