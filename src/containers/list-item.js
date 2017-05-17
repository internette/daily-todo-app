import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import { send } from 'redux-electron-ipc'
import {delItem, toggleComplete, toggleDetailsVisibility, toggleEdit, updateDetails, setHeight, cancel} from '../actions'

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
    cancel: ()=> {
      dispatch(toggleEdit(ownProps.id))
    },
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
    updateDetails: (id, new_details, scrollheight) => {
      const old_scrollheight = parseInt(ownProps.details_height)
      const new_scrollheight = scrollheight === old_scrollheight ? old_scrollheight : scrollheight + 15
      dispatch(updateDetails(id, new_details))
      dispatch(setHeight(id, new_scrollheight))
    },
    saveUpdate: ()=> {
      dispatch(send('updated-details', {id: ownProps.id, details: ownProps.details}))
    },
    getHeight: (id, scrollheight)=> {
      dispatch(setHeight(id, scrollheight + 15))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem