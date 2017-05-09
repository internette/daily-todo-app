import React from "react";
import ReactDOM from "react-dom";
import AddItem from "./add-item.jsx";
import ListItem from "./list-item.jsx";
import Menu from "./menu.jsx";
import {ipcRenderer} from 'electron';

require('./index.scss');

class App extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      todoItems: [],
      isOnTop: false,
      lastReset: ''
    }
  }
  componentDidMount = ()=> {
    ipcRenderer.send('get-items', '')
    const _this = this
    ipcRenderer.on('send-items', function(event, args){
      _this.setState({todoItems: args.todoItems})
      _this.setState({lastReset: new Date(args.resetDate)})
    })
    ipcRenderer.send('get-top-status', '')
    ipcRenderer.on('send-top-status', function(event, args){
      _this.setState({isOnTop: args})
    })
    window.setInterval(()=>{
      this.checkIfMidnight()
      this.checkIfUpToDate()
    }, 1000)
  }
  exit() {
    ipcRenderer.send('app-close', true)
  }
  checkIfUpToDate = ()=> {
    const formattedLastDate = new Date(new Date(this.state.lastReset).setHours(0,0,0,0)).getTime() / 1000
    const yesterday = new Date(new Date().setHours(0,0,0,0)).getTime() / 1000
    if(yesterday > formattedLastDate){
      ipcRenderer.send('reset-tasks','')
    }
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