import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import { send } from 'redux-electron-ipc'
import {delItem, toggleComplete, toggleDetailsVisibility, toggleEdit, updateDetails} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: ownProps.expanded,
    isComplete: ownProps.complete,
    isEditing: ownProps.isEditing,
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
    },
    toggleEdit: () => {
      dispatch(toggleEdit(ownProps.id))
    },
    updateDetails: (new_details) => {
      dispatch(updateDetails(ownProps.id, new_details))
    },
    saveUpdate: ()=> {
      dispatch(send('updated-details', {id: ownProps.id, details: ownProps.details}))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem