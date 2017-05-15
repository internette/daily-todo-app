import { connect } from 'react-redux'
import MenuPresenter from "../components/menu-presenter.js"
import { send } from 'redux-electron-ipc'
import { toggleMenu } from "../actions"

const mapStateToProps = (state, ownProps) => {
  console.log(state.menuStatus)
  return {
    expanded: state.menuStatus.expanded !== undefined ? state.menuStatus.expanded : false,
    isOnTop: state.menuStatus.isOnTop !== undefined ? state.menuStatus.isOnTop : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetTasks: () => {
      dispatch(send('reset-tasks', ''))
    },
    toggleMenu: () => {
      dispatch(toggleMenu(ownProps.expanded))
    },
    toggleTopStatus: (ontop_status) => {
      dispatch(send('app-on-top', ontop_status))
    }
  }
}

const Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPresenter)

export default Menu