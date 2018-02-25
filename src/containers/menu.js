import { connect } from 'react-redux'
import MenuPresenter from "../components/menu-presenter.js"
import { send } from 'redux-electron-ipc'
import { toggleMenu } from "../actions"

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.menuStatus.hasOwnProperty('expanded') ? state.menuStatus.expanded : false,
    isOnTop: state.menuStatus.hasOwnProperty('isOnTop') ? state.menuStatus.isOnTop : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteTasks: ()=> {
      dispatch(send('delete-tasks', ''))
    },
    resetTasks: () => {
      dispatch(send('reset-tasks', ''))
    },
    toggleMenu: () => {
      dispatch(toggleMenu(ownProps.expanded))
    },
    toggleTopStatus: () => {
      dispatch(send('app-on-top', ''))
    },
    getSettings: () => {
      dispatch(send('new-window', {type: 'settings'}))
<<<<<<< HEAD
=======
      dispatch(toggleMenu(ownProps.expanded))
>>>>>>> 5f84c0d0718c876d1855cabadbe75cc0a780e4d1
    }
  }
}

const Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPresenter)

export default Menu