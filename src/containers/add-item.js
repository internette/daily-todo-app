import { connect } from 'react-redux'
import { toggleToDo } from '../actions'
import AddItemPresenter from '../components/add-item-presenter';

const mapStateToProps = (state) => {
  return {
    title: state.title,
    details: state.details
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: () => {
      dispatch(addItem(ownProps))
    },
    toggleFocus: () => {
      dispatch(toggleFocus(ownProps.focused))
    },
    toggleForm: () => {
      dispatch(toggleForm(ownProps))
    }
  }
}

const AddToDo = connect(mapStateToProps,mapDispatchToProps)(AddItemPresenter)

export default AddToDo