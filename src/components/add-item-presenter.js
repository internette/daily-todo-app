import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
require('../styles/add-item.scss')

const AddItemPresenter = (props) => (
  <div id="input">
    <h3 onClick={props.toggleForm}>Add Item <span>+</span></h3>
    <form className={props.expanded ? 'expanded' : null} onSubmit={(e)=> props.addItem(e, props.title, props.details, props.id)}>
      <div className={props.title_focused ? 'focused row-cont' : 'row-cont'}>
        <input id="title"
               type="text"
               onFocus={props.toggleTitleFocus}
               onBlur={props.toggleTitleFocus}
               onChange={props.updateValues}
               value={props.title} />
        <label htmlFor="title">Task</label>
      </div>
      <div className={props.details_focused ? 'focused row-cont' : 'row-cont'}>
        <Scrollbars 
          id="details-scroll"
          autoHide
          style={{ width: '100%', height: "8rem" }}
          renderThumbVertical = {props => <div className="thumb-vertical"/>}>
          <textarea id="details"
                    type="textarea"
                    onFocus={props.toggleDetailsFocus}
                    onBlur={props.toggleDetailsFocus}
                    onChange={props.updateValues}
                    style={{'height': props.details_height}}
                    value={props.details} >
          </textarea>  
        </Scrollbars>
        <label htmlFor="details">Details</label>
      </div>
      <button type="submit" id="add-item">Add</button>
      <a id="close-form" onClick={props.toggleForm}>Cancel</a>
    </form>
  </div>
)

AddItemPresenter.propTypes = {
  details: PropTypes.string.isRequired,
  details_focused: PropTypes.bool.isRequired,
  details_height: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
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