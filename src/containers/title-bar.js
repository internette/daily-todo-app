import { connect } from 'react-redux'
import { exit } from '../actions/index.js'
import { send } from 'redux-electron-ipc'
import TitleBarPresenter from '../components/titlebar-presenter.js';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    exit: () => {
      dispatch(send('app-close', ''))
    },
    minimize: () => {
      dispatch(send('minimize', ''))
    }
  }
}

const TitleBar = connect(undefined, mapDispatchToProps)(TitleBarPresenter)

export default TitleBar