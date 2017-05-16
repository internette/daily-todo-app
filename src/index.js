import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createIpc, { send } from 'redux-electron-ipc'
import toDoApp from "./reducers"
import { init, setTopStatus, updateItem, setDetails, resetAll } from "./actions"
import App from './components/app.js'

const ipc = createIpc({
  'send-items': init,
  'send-top-status': setTopStatus,
  'reset-all' : resetAll,
  'item-action': updateItem,
  'set-details': setDetails
});

const store = createStore(toDoApp, applyMiddleware(ipc));


store.dispatch(send('get-items'));
store.dispatch(send('get-top-status'));

const app = document.getElementById('app')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)