import { combineReducers } from 'redux'
import todoItems from './todos'
import lastReset from './last_reset'
import menuStatus from './menu'
import formActions from './form'

const toDoApp = combineReducers({
  todoItems,
  lastReset,
  menuStatus,
  formActions
})

export default toDoApp