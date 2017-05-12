import { connect } from 'react-redux'
import ListItemPresenter from "../components/list-item-presenter.js"
import { delItem, toggleComplete, toggleDetails } from "../actions"

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
    toggleExpanded: () => {
      dispatch(setExpandedStatus(ownProps.expanded))
    },
    toggleComplete: () => {
      dispatch(setCompleteStatus(ownProps.complete))
    }
  }
}

const ListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemPresenter)

export default ListItem