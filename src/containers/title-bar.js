import { connect } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import { exit } from '../actions/index.js'
import TitleBarPresenter from '../components/titlebar-presenter.js';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    exit: () => {
      dispatch(exit(ownProps.exit))
    }
  }
}

const TitleBar = connect(undefined, mapDispatchToProps)(TitleBarPresenter)

export default TitleBar