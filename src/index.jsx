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
  }
  exit() {
    ipcRenderer.send('app-close', true)
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