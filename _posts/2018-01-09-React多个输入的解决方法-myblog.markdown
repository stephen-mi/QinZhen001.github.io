---
layout:     post
title:      "React多个输入的解决方法"
date:       2018-01-09 11:10:00
author:     "Qz"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - React
---

> “Yeah It's on. ”


## 正文

https://doc.react-china.org/docs/forms.html

当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。

```


class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```


注意我们如何使用ES6当中的计算属性名语法来更新与给定输入名称相对应的状态键：

```
this.setState({
  [name]: value
});
```

相当于如下ES5语法

```
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

**同样由于 setState() 自动将部分状态合并到当前状态，因此我们只需要使用发生变化的部分调用它。**














