import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import {delItem, toggleComplete, toggleDetailsVisibility} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isExpanded: ownProps.expanded,
    isComplete: ownProps.complete,
    title: ownProps.title,
    details: ownProps.details
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delItem: () => {
      dispatch(delItem(ownProps))
    },
    toggleDetailsVisibility: () => {
      dispatch(toggleDetailsVisibility(ownProps.expanded))
    },
    toggleComplete: () => {
      dispatch(toggleComplete(ownProps.complete))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem