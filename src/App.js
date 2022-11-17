import React, { Component } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';
import './App.css';
import PubSub from 'pubsub-js';
import context from './components/context';

export default class App extends Component {
  state = {
    datas: JSON.parse(localStorage.getItem('datas')) || [],
    id: undefined,
  };

  //挂载阶段
  componentDidMount() {
    //添加
    this.addId = PubSub.subscribe('add', (topic, dataName) => {
      //创建一个新数组进行替换
      const data = {
        id: Date.now(),
        dataName,
        isDone: false,
      };
      const newData = [...this.state.datas];
      newData.push(data);
      this.setState({
        datas: newData,
      });
    });
    //单选按钮
    this.upId = PubSub.subscribe('update', (topic, id) => {
      const newData = this.state.datas.map(item => {
        if (item.id === id) item.isDone = !item.isDone;
        return item;
      });
      this.setState({
        datas: newData,
      });
    });
    //全选按钮
    this.allId = PubSub.subscribe('All', (topic, target) => {
      const newData = this.state.datas.map(item => {
        item.isDone = target;
        return item;
      });
      this.setState({
        datas: newData,
      });
    });
    //删除按钮
    this.clearId = PubSub.subscribe('del', (topic, id) => {
      const newTodos = this.state.datas.filter(item => item.id !== id);
      this.setState({
        datas: newTodos,
      });
    });
    //修改appid
    this.editId = PubSub.subscribe('edit', (topic, id) => {
      this.setState({
        id,
      });
    });
    //修改任务名
    this.edId = PubSub.subscribe('ed', (topic, dataName) => {
      const newData = this.state.datas.map(item => {
        if (item.id === this.state.id) item.dataName = dataName;
        return item;
      });
      this.setState({
        datas: newData,
        id: undefined,
      });
    });
  }

  //清除所有完成项目
  clearAllDone = () => {
    const newTodos = this.state.datas.filter(item => {
      return !item.isDone;
    });
    this.setState({
      datas: newTodos,
    });
  };

  //卸载阶段
  componentWillUnmount() {
    PubSub.unsubscribe(this.addId);
    PubSub.unsubscribe(this.upId);
    PubSub.unsubscribe(this.allId);
    PubSub.unsubscribe(this.clearId);
    PubSub.unsubscribe(this.editId);
    PubSub.unsubscribe(this.edId);
  }

  render() {
    const { datas, id } = this.state;
    localStorage.setItem('datas', JSON.stringify(datas));
    return (
      //将ID传递到所有子组件
      <context.Provider value={id}>
        <div className="todo-container">
          <div className="todo-wrap">
            <Header></Header>
            {datas.length ? (
              <div>
                <List datas={datas}></List>
                <Footer datas={datas} clearAllDone={this.clearAllDone}></Footer>
              </div>
            ) : (
              <h1>恭喜您,暂无任务!</h1>
            )}
          </div>
        </div>
      </context.Provider>
    );
  }
}
