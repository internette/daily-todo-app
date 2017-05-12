import { connect } from 'react-redux'
import MenuPresenter from "../components/menu-presenter.js"
import { resetTasks, toggleMenu, toggleTopStatus } from "../actions"

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.menuStatus.expanded ? state.menuStatus.expanded : false,
    isOnTop: state.menuStatus.isOnTop ? state.menuStatus.isOnTop : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetTasks: () => {
      dispatch(resetTasks())
    },
    toggleMenu: () => {
      dispatch(toggleMenu(ownProps.expanded))
    },
    toggleTopStatus: () => {
      dispatch(toggleTopStatus(ownProps.isOnTop))
    }
  }
}

const Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPresenter)

export default Menu