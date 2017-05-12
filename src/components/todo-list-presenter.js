import React from 'react'
import PropTypes from 'prop-types'
import {Scrollbars} from 'react-custom-scrollbars'
import ListItem from "../containers/list-item.js"
// TODO: Move related styles to own stylesheet
require('../styles/index.scss')

const ToDoListPresenter = ({todoItems})=> (
  <div id="todo-items">
    {todoItems.map(todo =>
      <ListItem key={todo.id} {...todo}/>
    )}
  </div>
)

ToDoListPresenter.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default ToDoListPresenter