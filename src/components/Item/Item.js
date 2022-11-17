import React, { Component } from 'react';
import './Item.css';
import PubSub from 'pubsub-js';
import context from '../context';

export default class Item extends Component {
  state = {
    tN: '',
  };

  updateHandel = e => {
    PubSub.publish('update', this.props.data.id);
  };

  delHandle = e => {
    PubSub.publish('del', this.props.data.id);
  };
  render() {
    const { dataName, id, isDone } = this.props.data;
    return (
      <context.Consumer>
        {editId => {
          return (
            <li>
              {editId !== id ? (
                <label>
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {
                      this.updateHandel();
                    }}
                  />
                  <span className={isDone ? 'done' : ''}>{dataName}</span>
                </label>
              ) : (
                <input
                  type="text"
                  className="editInp"
                  // 文本框中展示什么数据,有状态tN决定
                  value={this.state.tN}
                  // 让用户可以在文本框中正常输入数据
                  onChange={e => {
                    // const { tN } = this.state;
                    this.setState({
                      tN: e.target.value.trim(),
                    });
                  }}
                  onKeyDown={e => {
                    const { tN } = this.state;
                    if (e.key !== 'Enter' || !tN) return;
                    PubSub.publish('ed', tN);
                  }}
                />
              )}
              <button className="btn btn-danger" onClick={this.delHandle}>
                删除
              </button>
              <button
                className="btn btn-edit"
                onClick={() => {
                  // 修改app中的editId
                  // updateEditId(editId !== id ? id : undefined);
                  PubSub.publish('edit', editId !== id ? id : undefined);
                  // 将当前数据的任务名添加到tN中,tN是什么,则文本框中就渲染什么
                  this.setState({
                    tN: dataName,
                  });
                }}
              >
                {editId !== id ? '编辑' : '取消'}
              </button>
            </li>
          );
        }}
      </context.Consumer>
    );
  }
}
