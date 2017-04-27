import React from "react";
import ReactDOM from "react-dom";
import {Scrollbars} from 'react-custom-scrollbars';
import {ipcRenderer} from "electron";
require('./list-item.scss');

class ListItem extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      isExpanded: false,
      isComplete: false
    }
  }
  delete = ()=> {
    ipcRenderer.send('delete-item', this.props.listItem)
  }
  toggleDetails = ()=> {
    this.setState({isExpanded: !this.state.isExpanded})
  }
  toggleComplete = ()=>{
    this.setState({isComplete: !this.state.isComplete})
    ipcRenderer.send('completed-action', this.props.listItem)
  }
  render() {
    const item = this.props.listItem
    const detailsLink = item.details ? <span onClick={this.toggleDetails}>show details</span> : null;
    const details = item.details ? <div className='details'>
                                    <Scrollbars autoHide
                                                style={{ width: '100%', height: "8rem" }}
                                                renderThumbVertical = {props => <div className="thumb-vertical"/>}><div>{item.details}</div></Scrollbars></div> : null;
    return (
      <div className={this.state.isExpanded ? 'expanded list-item' : 'list-item'}>
        <div className={'item'}>
          <a onClick={this.toggleComplete} className={this.state.isComplete ? 'completed' : ''}>{item.title}</a>
          {detailsLink}
          <a className='delete' onClick={this.delete}>&times;</a>
        </div>
        {details}
      </div>
    )
  }
}

export default ListItem