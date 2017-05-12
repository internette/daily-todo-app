import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
require('../styles/add-item.scss')

const AddItemPresenter = ({updateValues, toggleForm, toggleTitleFocus, toggleDetailsFocus, title_focused, details_focused, expanded, title, details, addItem}) => (
  <div id="input">
    <h3 onClick={toggleForm}>Add Item <span>+</span></h3>
    <form className={expanded ? 'expanded' : null}>
      <div className={title_focused ? 'focused row-cont' : 'row-cont'}>
        <input id="title"
               type="text"
               onFocus={toggleTitleFocus}
               onBlur={toggleTitleFocus}
               onKeyPress={updateValues}
               value={title} />
        <label htmlFor="title">Task</label>
      </div>
      <div className={details_focused ? 'focused row-cont' : 'row-cont'}>
        <Scrollbars 
          id="details-scroll"
          autoHide
          style={{ width: '100%', height: "8rem" }}
          renderThumbVertical = {props => <div className="thumb-vertical"/>}>
          <div contentEditable="true"
               id="details"
               onFocus={toggleDetailsFocus}
               onBlur={toggleDetailsFocus}
               onKeyPress={updateValues}
               value={details} >
          </div>  
        </Scrollbars>
        <label htmlFor="details">Details</label>
      </div>
      <a id="add-item" onClick={addItem}>Add</a>
      <a id="close-form" onClick={toggleForm}>Cancel</a>
    </form>
  </div>
)

AddItemPresenter.propTypes = {
  details: PropTypes.string.isRequired,
  details_focused: PropTypes.bool.isRequired,
  title_focused: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  toggleTitleFocus: PropTypes.func.isRequired,
  toggleDetailsFocus: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  updateValues: PropTypes.func.isRequired
}

export default AddItemPresenter