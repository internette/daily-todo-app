import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
require('../styles/add-item.scss')

const AddItemPresenter = ({toggleForm, toggleFocus, title, details, addItem}) => (
  <div id="input">
    <h3 onClick={toggleForm}>Add Item <span>+</span></h3>
    <form>
      <div className="row-cont">
        <label htmlFor="title">Task</label>
        <input id="title"
               type="text"
               onFocus={toggleFocus}
               onBlur={toggleFocus}
               value={title}/>
      </div>
      <div className="row-cont">
        <Scrollbars 
          id="details-scroll"
          autoHide
          style={{ width: '100%', height: "8rem" }}
          renderThumbVertical = {props => <div className="thumb-vertical"/>}>
          <div contentEditable="true"
               id="details"
               value={details}
               onFocus={toggleFocus}
               onBlur={toggleFocus}>
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
  title: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  toggleFocus: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
}

export default AddItemPresenter