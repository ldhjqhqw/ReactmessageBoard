import React, { Component } from 'react';
import './Footer.css';
import PubSub from 'pubsub-js';
export default class Footer extends Component {
  allcheckHandle = e => {
    const target = e.target.checked;
    PubSub.publish('All', target);
  };
  render() {
    //拿到数据的长度
    const allTotal = this.props.datas.length;
    const doneTotal = this.props.datas.filter(item => item.isDone).length;
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={allTotal === doneTotal}
            onChange={this.allcheckHandle}
          />
        </label>
        <span>
          <span>已完成{allTotal} </span> / 全部 {doneTotal}
        </span>
        <button className="btn btn-danger" onClick={this.props.clearAllDone}>
          清除已完成任务
        </button>
      </div>
    );
  }
}
