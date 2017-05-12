import React from 'react'
import PropTypes from 'prop-types'
import TitleBar from "../containers/title-bar.js"
import ToDoList from "../containers/todo-list.js"
import AddItem from "../containers/add-item.js"

const App = ()=> (
  <div id="container">
    <TitleBar/>
    <ToDoList/>
    <AddItem/>
  </div>
)

export default App