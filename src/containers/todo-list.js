import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import ToDoListPresenter from '../components/todo-list-presenter.js'

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const ToDoList = connect(
  mapStateToProps,
  null
)(ToDoListPresenter)

export default ToDoList