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

setInterval(function(){
  const currentdate = new Date();
  const offsetHrs = currentdate.getTimezoneOffset() / 60;
  let hours = currentdate.getUTCHours() - offsetHrs;
  if( hours >= 24 ){ hours -= 24; }
  if( hours < 0 ){ hours += 12; }
  const mins = currentdate.getMinutes();
  const secs = currentdate.getSeconds();
  if (hours === 0 && mins === 0 && secs >= 0 && secs <= 1){
    return store.dispatch(send('reset-tasks'));
  }
}, 1000);
store.dispatch(send('get-items'));
store.dispatch(send('get-top-status'));

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)