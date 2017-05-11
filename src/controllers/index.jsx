import React from "react";
import ReactDOM from "react-dom";
import AddItem from "./add-item.jsx";
import ListItem from "./list-item.jsx";
import Menu from "./menu.jsx";
import {ipcRenderer} from 'electron';

require('../styles/index.scss');

class App extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      todoItems: [],
      isOnTop: false
    }
  }
  componentDidMount = ()=> {
    ipcRenderer.send('get-items', '')
    const _this = this
    ipcRenderer.on('send-items', function(event, items){
      _this.setState({todoItems: items})
    })
    ipcRenderer.send('get-top-status', '')
    ipcRenderer.on('send-top-status', function(event, args){
      _this.setState({isOnTop: args})
    })
    window.setInterval(()=>{
      this.checkIfMidnight()
    }, 1000)
  }
  exit() {
    ipcRenderer.send('app-close', true)
  }
  checkIfMidnight = () => {
    const currentdate = new Date()
    const offsetHrs = currentdate.getTimezoneOffset() / 60
    let hours = currentdate.getUTCHours() - offsetHrs
    if( hours >= 24 ){ hours -= 24; }
    if( hours < 0 ){ hours += 12; }
    const mins = currentdate.getMinutes()
    const secs = currentdate.getSeconds()
    const _this = this;
    if (hours === 0 && mins === 0 && secs >= 0 && secs <= 1){
      ipcRenderer.send('reset-tasks','')
    }
  }
  toggleTopStatus = () => {
    this.setState({isOnTop: !this.state.isOnTop})
    ipcRenderer.send('update-top-status', this.state.isOnTop)
  }
  render() {
    return (
      <div id="container">
        <h1><span>Daily</span>_ToDo<Menu/><a id="exit" onClick={this.exit}>&times;</a></h1>
        <div id="todo-items">
          {this.state.todoItems.map(function(item, index){
            return <ListItem listItem={item} key={index}/>
          })}
        </div>
        <AddItem/>
      </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<App/>, app);