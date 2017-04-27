import React from "react";
import ReactDOM from "react-dom";
import {ipcRenderer} from "electron";
require('./menu.scss');

class Menu extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      isExpanded: false,
      isOnTop: false
    }
  }
  componentDidMount = ()=> {
    ipcRenderer.send('get-top-status', '')
    const _this = this
    ipcRenderer.on('send-top-status', function(event, status){
      _this.setState({isOnTop: status})
    })
  }
  toggleMenu = ()=> {
    this.setState({isExpanded: !this.state.isExpanded})
  }
  resetTask(){
    ipcRenderer.send('reset-tasks','')
    this.toggleMenu()
  }
  toggleTopStatus = ()=> {
    this.setState({isOnTop: !this.state.isOnTop})
    ipcRenderer.send('app-on-top', !this.state.isOnTop)
    this.toggleMenu()
  }
  render() {
    return (
      <div id="subnav-cont" className={this.state.isExpanded ? 'expanded' : ''}>
        <div id="subnav-icon" onClick={this.toggleMenu}>&hellip;</div>
        <div id="subnav">
          <ul>
            <li onClick={this.resetTask}>
              <a>Reset Tasks</a>
            </li>
            <li onClick={this.toggleTopStatus}>
              <a>Keep on Top<span className={this.state.isOnTop ? 'active' : ''}></span></a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Menu