import { combineReducers } from 'redux'
import todoItems from './todos'
import latestStats from './get_latest'
import menuStatus from './menu'
import formActions from './form'

const toDoApp = combineReducers({
  todoItems,
  latestStats,
  menuStatus,
  formActions
})

export default toDoApp