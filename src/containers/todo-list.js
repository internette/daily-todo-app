import { connect } from 'react-redux'
import { toggleTodo } from '../actions/index.js'
import ToDoListPresenter from '../components/todo-list-presenter.js'

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const ToDoList = connect(
  mapStateToProps
)(ToDoListPresenter)

export default ToDoList