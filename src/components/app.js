import React from 'react'
import TitleBar from "../containers/title-bar.js"
import ToDoList from "../containers/todo-list.js"
import AddItem from "../containers/add-item.js"
import Settings from "../containers/settings.js"
const app = window.require('electron').remote;

const comp_type = app.getCurrentWindow().component_type;

const App = ()=> {
  if(comp_type === 'app'){
    return (
      <div id="container">
        <TitleBar />
        <ToDoList />
        <AddItem />
      </div>
    )
  }
  if(comp_type === 'settings'){
    return (
      <div id="container">
        <Settings/>
      </div>
    )
  }
}

export default App