import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createIpc, { send } from 'redux-electron-ipc'
import toDoApp from "../reducers/index.js"
import App from '../components/app.js'

const ipc = createIpc({
  'send-items': toDoApp
});

const store = createStore(exampleReducer, applyMiddleware(ipc));


store.dispatch(send('get-items'));

const app = document.getElementById('app')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)