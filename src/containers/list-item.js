import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import { send } from 'redux-electron-ipc'
import {delItem, toggleComplete, toggleDetailsVisibility, toggleEdit, updateDetails, setHeight} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: ownProps.expanded,
    isComplete: ownProps.complete,
    isEditing: ownProps.isEditing,
    title: ownProps.title,
    details: ownProps.details,
    id: ownProps.id,
    details_height: ownProps.hasOwnProperty('details_height') ? ownProps.details_height : '0px'
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
    updateDetails: (id, new_details) => {
      dispatch(updateDetails(id, new_details))
    },
    saveUpdate: ()=> {
      dispatch(send('updated-details', {id: ownProps.id, details: ownProps.details}))
    },
    getHeight: (id, scrollheight)=> {
      dispatch(setHeight(id, scrollheight))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem