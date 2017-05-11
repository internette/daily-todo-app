import { connect } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import { exit } from '../actions'
import { TitleBarPresenter } from '../components/titlebar-presenter';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    exit: () => {
      dispatch(exit(ownProps.exit))
    }
  }
}

const TitleBar = connect(null,mapDispatchToProps)(TitleBarPresenter)

export default TitleBar