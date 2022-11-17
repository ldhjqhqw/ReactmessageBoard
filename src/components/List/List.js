import React, { Component } from 'react';
import Item from '../Item/Item';
import './List.css';
export default class List extends Component {
  render() {
    const { datas } = this.props;
    return (
      <ul className="todo-main">
        {datas.map(item => {
          return <Item key={item.id} data={item}></Item>;
        })}
      </ul>
    );
  }
}
