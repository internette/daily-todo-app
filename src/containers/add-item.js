import { connect } from 'react-redux'
import { toggleTitleFocus, toggleDetailsFocus, toggleForm, updateValues, setFormHeight } from '../actions'
import { send } from 'redux-electron-ipc'
import AddItemPresenter from '../components/add-item-presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.formActions.title ? state.formActions.title : '',
    details: state.formActions.details ? state.formActions.details : '',
    expanded: state.formActions.hasOwnProperty('expanded') ? state.formActions.expanded : false,
    title_focused: state.formActions.hasOwnProperty('title_focused') ? state.formActions.title_focused : false,
    details_focused: state.formActions.hasOwnProperty('details_focused') ? state.formActions.details_focused : false,
    details_height: state.formActions.hasOwnProperty('details_height') ? state.formActions.details_height : '0px',
    id: state.latestStats.nextId ? state.latestStats.nextId : 0
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const getHeight = (scrollheight)=> {
    dispatch(setFormHeight(scrollheight))
  }
  return {
    addItem: (e, title, details, id) => {
      e.preventDefault()
      dispatch(toggleForm(ownProps.expanded))
      dispatch(send('add-to-do', {title: title, details: details, complete: false, id: id}))
    },
    toggleTitleFocus: () => {
      dispatch(toggleTitleFocus(ownProps.title_focused))
    },
    toggleDetailsFocus: (e) => {
      dispatch(toggleDetailsFocus(ownProps.details_focused))
      getHeight(e.target.scrollHeight)
    },
    toggleForm: () => {
      dispatch(toggleForm(ownProps.expanded))
    },
    updateValues: (e)=> {
      dispatch(updateValues(e.target.id, e.target.value))
      if(e.target.id === 'details'){
        getHeight(e.target.scrollHeight)
      }
    }
  }
}

const AddItem = connect(mapStateToProps,mapDispatchToProps)(AddItemPresenter)

export default AddItem