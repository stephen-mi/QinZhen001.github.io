---
layout:     post
title:      "装饰器模式"
date:       2018-01-17 16:09:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - DesignPattern
---

> “Yeah It's on. ”


## 装饰器模式
[网页链接](https://www.cnblogs.com/star91/p/zhuang-shi-qi-mo-shiES7-Decorator-zhuang-shi-qi.html)

http://www.runoob.com/design-pattern/decorator-pattern.html

装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

我们通过下面的实例来演示装饰器模式的用法。其中，我们将把一个形状装饰上不同的颜色，同时又不改变形状类。



### 介绍

意图：动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。

主要解决：一般的，我们为了扩展一个类经常使用继承方式实现，由于继承为类引入静态特征，并且随着扩展功能的增多，子类会很膨胀。

何时使用：在不想增加很多子类的情况下扩展类。

如何解决：将具体功能职责划分，同时继承装饰者模式。

关键代码： 
1.Component 类充当抽象角色，不应该具体实现。
2、修饰类引用和继承 Component 类，具体扩展类重写父类方法。

应用实例： 1、孙悟空有 72 变，当他变成"庙宇"后，他的根本还是一只猴子，但是他又有了庙宇的功能。 2、不论一幅画有没有画框都可以挂在墙上，但是通常都是有画框的，并且实际上是画框被挂在墙上。在挂在墙上之前，画可以被蒙上玻璃，装到框子里；这时画、玻璃和画框形成了一个物体。

优点：装饰类和被装饰类可以独立发展，不会相互耦合，装饰模式是继承的一个替代模式，装饰模式可以动态扩展一个实现类的功能。

缺点：多层装饰比较复杂。

使用场景： **1、扩展一个类的功能。 2、动态增加功能，动态撤销。**

注意事项：可代替继承。

### 实现
我们将创建一个 Shape 接口和实现了 Shape 接口的实体类。然后我们创建一个实现了 Shape 接口的抽象装饰类 ShapeDecorator，并把 Shape 对象作为它的实例变量。

RedShapeDecorator 是实现了 ShapeDecorator 的实体类。

DecoratorPatternDemo，我们的演示类使用 RedShapeDecorator 来装饰 Shape 对象。

![enter description here][1]




步骤 1
创建一个接口。

Shape.java
```
public interface Shape {
   void draw();
}
```
步骤 2
创建实现接口的实体类。

Rectangle.java
```
public class Rectangle implements Shape {

   @Override
   public void draw() {
      System.out.println("Shape: Rectangle");
   }
}
```
Circle.java
```
public class Circle implements Shape {

   @Override
   public void draw() {
      System.out.println("Shape: Circle");
   }
}
```
步骤 3
创建实现了 Shape 接口的抽象装饰类。

ShapeDecorator.java
```
public abstract class ShapeDecorator implements Shape {
   protected Shape decoratedShape;

   public ShapeDecorator(Shape decoratedShape){
      this.decoratedShape = decoratedShape;
   }

   public void draw(){
      decoratedShape.draw();
   }    
}
```


步骤 4
创建扩展了 ShapeDecorator 类的实体装饰类。

RedShapeDecorator.java
```
public class RedShapeDecorator extends ShapeDecorator {

   public RedShapeDecorator(Shape decoratedShape) {
      super(decoratedShape);        
   }

   @Override
   public void draw() {
      decoratedShape.draw();           
      setRedBorder(decoratedShape);
   }

   private void setRedBorder(Shape decoratedShape){
      System.out.println("Border Color: Red");
   }
}
```



步骤 5
使用 RedShapeDecorator 来装饰 Shape 对象。

DecoratorPatternDemo.java
```
public class DecoratorPatternDemo {
   public static void main(String[] args) {

      Shape circle = new Circle();

      Shape redCircle = new RedShapeDecorator(new Circle());

      Shape redRectangle = new RedShapeDecorator(new Rectangle());
      System.out.println("Circle with normal border");
      circle.draw();

      System.out.println("\nCircle of red border");
      redCircle.draw();

      System.out.println("\nRectangle of red border");
      redRectangle.draw();
   }
}
```

步骤 6
验证输出。
```
Circle with normal border
Shape: Circle

Circle of red border
Shape: Circle
Border Color: Red

Rectangle of red border
Shape: Rectangle
Border Color: Red
```



一个更易理解的实例：

装饰模式为已有类动态附加额外的功能就像LOL、王者荣耀等类Dota游戏中，英雄升级一样。每次英雄升级都会附加一个额外技能点学习技能。具体的英雄就是ConcreteComponent，技能栏就是装饰器Decorator，每个技能就是ConcreteDecorator；
```
//Component 英雄接口 
public interface Hero {
    //学习技能
    void learnSkills();
}
//ConcreteComponent 具体英雄盲僧
public class BlindMonk implements Hero {
    
    private String name;
    
    public BlindMonk(String name) {
        this.name = name;
    }

    @Override
    public void learnSkills() {
        System.out.println(name + "学习了以上技能！");
    }
}
//Decorator 技能栏
public class Skills implements Hero{
    
    //持有一个英雄对象接口
    private Hero hero;
    
    public Skills(Hero hero) {
        this.hero = hero;
    }

    @Override
    public void learnSkills() {
        if(hero != null)
            hero.learnSkills();
    }    
}
//ConreteDecorator 技能：Q
public class Skill_Q extends Skills{
    
    private String skillName;

    public Skill_Q(Hero hero,String skillName) {
        super(hero);
        this.skillName = skillName;
    }

    @Override
    public void learnSkills() {
        System.out.println("学习了技能Q:" +skillName);
        super.learnSkills();
    }
}
//ConreteDecorator 技能：W
public class Skill_W extends Skills{

    private String skillName;

    public Skill_W(Hero hero,String skillName) {
        super(hero);
        this.skillName = skillName;
    }

    @Override
    public void learnSkills() {
        System.out.println("学习了技能W:" + skillName);
        super.learnSkills();
    }
}
//ConreteDecorator 技能：E
public class Skill_E extends Skills{
    
    private String skillName;
    
    public Skill_E(Hero hero,String skillName) {
        super(hero);
        this.skillName = skillName;
    }

    @Override
    public void learnSkills() {
        System.out.println("学习了技能E:"+skillName);
        super.learnSkills();
    }
}
//ConreteDecorator 技能：R
public class Skill_R extends Skills{    
    
    private String skillName;
    
    public Skill_R(Hero hero,String skillName) {
        super(hero);
        this.skillName = skillName;
    }
    
    @Override
    public void learnSkills() {
        System.out.println("学习了技能R:" +skillName );
        super.learnSkills();
    }
}
//客户端：召唤师
public class Player {
    public static void main(String[] args) {
        //选择英雄
        Hero hero = new BlindMonk("李青");
        
        Skills skills = new Skills(hero);
        Skills r = new Skill_R(skills,"猛龙摆尾");
        Skills e = new Skill_E(r,"天雷破/摧筋断骨");
        Skills w = new Skill_W(e,"金钟罩/铁布衫");
        Skills q = new Skill_Q(w,"天音波/回音击");
        //学习技能
        q.learnSkills();
    }
}
```
输出：

学习了技能Q:天音波/回音击
学习了技能W:金钟罩/铁布衫
学习了技能E:天雷破/摧筋断骨
学习了技能R:猛龙摆尾
李青学习了以上技能！



## 其他


### 小程序页面注入 

>2019.6.6 18:03

最近一直在写小程序相关框架，在搭建项目架子的时候，就用到了装饰器模式


[https://developers.weixin.qq.com/community/develop/article/doc/000022ca3e4d0877fb68e44ac56013](https://developers.weixin.qq.com/community/develop/article/doc/000022ca3e4d0877fb68e44ac56013)





![enter description here][2]



**在小程序页面的生命周期中注入其他函数，从而达到增加生命周期的效果。**





```javascript

// 在页面进入和离开时自动进行数据上报

/* eslint-disable */
(function () {
  let page_path = ''
  let option_ = ''
  let starttime_ = ''
  const sdk = wx.xhw.xhwSdk

  function appendFunc(instance, LifeCycle, appendFunc) {
    if (instance[LifeCycle]) {
      var LifeCyclefunc = instance[LifeCycle];
      instance[LifeCycle] = function (params) {
        LifeCyclefunc.call(this, params)
        appendFunc.call(this, params, LifeCycle);
      }
    } else {
      instance[LifeCycle] = function (params) {
        appendFunc.call(this, params, LifeCycle)
      }
    }
  }

  function appendFuncReturn(instance, LifeCycleFunc, appendFunc) {
    if (instance[LifeCycleFunc]) {
      var s = instance[LifeCycleFunc];
      instance[LifeCycleFunc] = function (params) {
        var n = s.call(this, params);
        appendFunc.call(this, [params, n], LifeCycleFunc);
        return n
      }
    } else {
      instance[LifeCycleFunc] = function (params) {
        appendFunc.call(this, params, LifeCycleFunc)
      }
    }
  }

  var apponLaunch = function (opt) {

  }
  var apponShow = function () {
  }
  var apponUnlaunch = function () {
  }
  var apponHide = function () {
  }
  var apponError = function (msg) {

  }
  var pageonLoad = function (opt) {

  }
  var pageonUnload = function () {
    console.log('pageonUnload')
  }
  var pageonShow = function () {
    let pageLen = getCurrentPages().length;
    let curPage = getCurrentPages()[pageLen - 1];
    option_ = Object.keys(curPage.options).length !== 0 ? JSON.stringify(curPage.options) : 'none';
    page_path = curPage.route;
    starttime_ = new Date().getTime();
    let reportData = {
      key: 90031,
      type_: 1,
      option_: option_,
      page_path: page_path,
      starttime_: starttime_
    };
    reportData.scene = sdk.getScene()
    reportData.trace_id = `${sdk.getOpenIdSync()}${reportData.starttime_}`;
    console.log('进入页面数据上报:', reportData);
    sdk.sendkv(reportData)
  }
  var pageonHide = function () {
    let reportData = {
      key: 90031,
      type_: 2,
      option_: option_,
      page_path: page_path,
      starttime_: starttime_
    };
    reportData.scene = sdk.getScene();
    let leftTime = new Date().getTime();
    reportData.trace_id = `${sdk.getOpenIdSync()}${leftTime}`;
    reportData.staytime_ = parseInt((leftTime - reportData.starttime_) / 1000);
    console.log('离开页面数据上报:', reportData);
    sdk.sendkv(reportData)
  }
  var pageonReady = function () {
  }
  //
  // var N = App;
  // App = function (obj) {
  //   appendFunc(obj, "onLaunch", apponLaunch);
  //   appendFunc(obj, "onUnlaunch", apponUnlaunch);
  //   appendFunc(obj, "onShow", apponShow);
  //   appendFunc(obj, "onHide", apponHide);
  //   appendFunc(obj, "onError", apponError);
  //   N(obj)
  // };
  var J = Page;
  Page = function (obj) {
    // appendFunc(obj, "onLoad", pageonLoad);
    // appendFunc(obj, "onUnload", pageonUnload);
    appendFunc(obj, "onShow", pageonShow);
    appendFunc(obj, "onHide", pageonHide);
    // appendFunc(obj, "onReady", pageonReady);
    // appendFunc(obj, "onPullDownRefresh", pageonPullDownRefresh);
    // if (typeof obj["onShareAppMessage"] != "undefined") {
    //   appendFuncReturn(obj, "onShareAppMessage", pageonShareAppMessage)
    // }
    J(obj)
  }
})();
```



>在每个页面require引入这个文件就行了



  [1]: http://www.runoob.com/wp-content/uploads/2014/08/decorator_pattern_uml_diagram.jpg
  [2]: https://s2.ax1x.com/2019/06/06/VdVdIJ.jpg