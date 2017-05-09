import React from "react";
import ReactDOM from "react-dom";
import {Scrollbars} from 'react-custom-scrollbars';
import {ipcRenderer} from "electron";
require('./add-item.scss');

class AddItem extends React.Component {
  constructor(state){
    super(state)
    this.state = {
      title: '',
      details: '',
      isComplete: false
    }
  }
  titleChange = (e)=> {
    this.setState({title: e.target.value})
  }
  detailsChange = (e)=> {
    this.setState({details: e.target.innerText})
  }
  addItem = (e)=> {
    ipcRenderer.send('add-item', this.state)
    this.toggleForm()
  }
  clear = (e)=> {
    document.querySelector('form').className = '';
  }
  toggleFocus(e){
    const classname = document.querySelector('label[for="'+e.target.id+'"]').className.match(/focused/gi) ? '' : 'focused'; 
    document.querySelector('label[for="'+e.target.id+'"]').className = classname;
  }
  toggleForm = (e)=> {
    const classname = document.querySelector('form').className.match(/expanded/gi) ? null : 'expanded'
    document.querySelector('form').className = classname
    const inputs = Object.keys(this.state)
    if(!classname){
      for(var i = 0; i<inputs.length; i++){
        inputs[i]==='title' ? this.setState({title: ''}) : this.setState({details: ''})
      }
    }
  }
  render() {
    return (
      <div id="input">
        <h3 onClick={this.toggleForm}>Add Item <span>+</span></h3>
        <form>
          <div className="row-cont">
            <label htmlFor="title">Task</label>
            <input id="title"
                   type="text"
                   onChange={this.titleChange}
                   onFocus={this.toggleFocus}
                   onBlur={this.toggleFocus}
                   value={this.state.title}/>
          </div>
          <div className="row-cont">
            <Scrollbars 
              id="details-scroll"
              autoHide
              style={{ width: '100%', height: "8rem" }}
              renderThumbVertical = {props => <div className="thumb-vertical"/>}>
              <div contentEditable="true" id="details" onKeyUp={this.detailsChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus}></div>
            </Scrollbars>
            <label htmlFor="details">Details</label>
          </div>
          <a id="add-item" onClick={this.addItem}>Add</a>
          <a id="close-form" onClick={this.toggleForm}>Cancel</a>
        </form>
      </div>
    )
  }
}

export default AddItem