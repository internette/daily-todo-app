import { connect } from 'react-redux'
import { addItem, toggleTitleFocus, toggleDetailsFocus, toggleForm, updateValues } from '../actions'
import { send } from 'redux-electron-ipc'
import AddItemPresenter from '../components/add-item-presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.formActions.title ? state.formActions.title : '',
    details: state.formActions.details ? state.formActions.details : '',
    expanded: state.formActions.expanded ? state.formActions.expanded : false,
    title_focused: state.formActions.title_focused ? state.formActions.title_focused : false,
    details_focused: state.formActions.details_focused ? state.formActions.details_focused : false,
    id: state.latestStats.lastId ? state.latestStats.lastId : 0
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: (e, title, details, id) => {
      e.preventDefault()
      console.log(title)
      dispatch(toggleForm(ownProps.expanded))
      dispatch(send('add-to-do', {title: title, details: details, complete: false, id: id}))
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
      dispatch(updateValues(e.target.id, e.target.value))
    }
  }
}

const AddItem = connect(mapStateToProps,mapDispatchToProps)(AddItemPresenter)

export default AddItem