import React from "react";
import ReactDOM from "react-dom";
import AddItem from "./add-item.jsx";
import ListItem from "./list-item.jsx";
import {ipcRenderer} from 'electron';

require('./index.scss');

class App extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      todoItems: []
    }
  }
  componentDidMount = ()=> {
    ipcRenderer.send('get-items', '')
    const _this = this
    ipcRenderer.on('send-items', function(event, items){
      _this.setState({todoItems: items})
    })
    window.setInterval(()=>{
      this.checkIfMidnight()
    }, 1000)
  }
  exit() {
    ipcRenderer.send('app-close', true)
  }
  checkIfMidnight = () => {
    var currentdate = new Date()
    var offsetHrs = currentdate.getTimezoneOffset() / 60
    var hours = currentdate.getUTCHours() + parseInt(offsetHrs)
    if( hours >= 24 ){ hours -= 24; }
    if( hours < 0 ){ hours += 12; }
    hours === 3 ? ipcRenderer.send('reset-tasks','') : null
  }
  render() {
    return (
      <div id="container">
        <h1><span>Daily</span>_ToDo<a id="exit" onClick={this.exit}>&times;</a></h1>
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