import { connect } from 'react-redux'
import { toggleTitleFocus, toggleDetailsFocus, toggleForm, updateValues } from '../actions/index.js'
import AddItemPresenter from '../components/add-item-presenter.js';

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.formActions.title ? state.formActions.title : '',
    details: state.formActions.details ? state.formActions.details : '',
    expanded: state.formActions.expanded ? state.formActions.expanded : false,
    title_focused: state.formActions.title_focused ? state.formActions.title_focused : false,
    details_focused: state.formActions.details_focused ? state.formActions.details_focused : false
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: () => {
      dispatch(addItem(ownProps))
    },
    toggleTitleFocus: () => {
      dispatch(toggleTitleFocus(ownProps.title_focused))
    },
    toggleDetailsFocus: () => {
      dispatch(toggleDetailsFocus(ownProps.details_focused))
    },
    toggleForm: () => {
      dispatch(toggleForm(ownProps.expanded))
    },
    updateValues: (e)=> {
      dispatch(updateValues(e.target.id, e.target.value + e.key))
    }
  }
}

const AddToDo = connect(mapStateToProps,mapDispatchToProps)(AddItemPresenter)

export default AddToDo