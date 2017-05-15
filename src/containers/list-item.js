import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import { send } from 'redux-electron-ipc'
import {delItem, toggleComplete, toggleDetailsVisibility} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: ownProps.expanded,
    isComplete: ownProps.complete,
    title: ownProps.title,
    details: ownProps.details,
    id: ownProps.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delItem: () => {
      dispatch(delItem(ownProps))
    },
    toggleDetailsVisibility: () => {
      dispatch(toggleDetailsVisibility(ownProps.id))
    },
    toggleComplete: (id) => {
      dispatch(send('completed-action', id))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem