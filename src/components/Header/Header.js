import React, { Component } from 'react';
import './Header.css';
import PubSub from 'pubsub-js';

export default class Header extends Component {
  handle = e => {
    //获取用户输入的值
    const dataName = e.target.value.trim();
    //判断按下的是否是回车，是则继续添加
    //判断dataName不为空，则继续往下执行
    if (e.keyCode !== 13 || !dataName) return;
    //要把todoName传递给app组件,让app组件修改todos
    PubSub.publish('add', dataName);
    //清空文本框
    e.target.value = '';
  };
  render() {
    return (
      <div className="todo-header">
        <input type="text" onKeyDown={this.handle} />
      </div>
    );
  }
}
