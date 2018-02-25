import { combineReducers } from 'redux'
import todoItems from './todos'
import latestStats from './get_latest'
import menuStatus from './menu'
import formActions from './form'
import settings from './settings'

const toDoApp = combineReducers({
  todoItems,
  latestStats,
  menuStatus,
  formActions,
  settings
})

export default toDoApp