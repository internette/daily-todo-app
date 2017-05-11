import { combineReducers } from 'redux'
import todos from './todos.js'
import appConfig from './app_config.js'

const toDoApp = combineReducers({
  todos,
  appConfig
})

export default toDoApp