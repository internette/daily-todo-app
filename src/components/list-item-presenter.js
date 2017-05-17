import React from 'react'
import PropTypes from 'prop-types'
import {Scrollbars} from 'react-custom-scrollbars'

require('../styles/list-item.scss')

const ListItemPresenter = ( props ) => {
  const detailsLink = props.details ? <span onClick={()=>{props.toggleDetailsVisibility(props.id)}} className="toggle-detail-visibility">{props.expanded ? 'hide' : 'show'} details</span> : null;
  const editIcon = props.editable ? <div className="edit-icons"><a className="save-icon" onClick={props.saveUpdate}></a><a className="cancel-icon"></a></div> : <div className="edit-icons"><a className="edit-icon" onClick={props.toggleEdit}></a></div>
  const details_elm_content = props.editable ? <textarea defaultValue={props.details} style={{'height': props.details_height}} onFocus={(e)=> {props.getHeight(props.id, e.target.scrollHeight)}} onChange={(e)=> {props.updateDetails(props.id, e.target.value, e.target.scrollHeight)}} autoFocus></textarea> : <div>{props.details}</div>
  const details_elm = props.details ? <div className={ props.editable ? 'details editing' : 'details'}>
                                  <Scrollbars autoHide
                                              style={{ width: '100%', height: "8rem" }}
                                              renderThumbVertical = {props => <div className="thumb-vertical"/>}>{details_elm_content}</Scrollbars>
                                              {editIcon}</div> : null;
  return (<div className={props.expanded ? 'expanded list-item' : 'list-item'}>
    <div className={'item'}>
      <a onClick={()=> {props.toggleComplete(props.id)}} className={props.complete ? 'completed' : ''}>{props.title}</a>
      {detailsLink}
      <a className='delete' onClick={props.delItem}>&times;</a>
    </div>
    {details_elm}
  </div>)
}

ListItemPresenter.propTypes = {
  id: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  details_height: PropTypes.string.isRequired,
  delItem: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toggleDetailsVisibility: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  updateDetails: PropTypes.func.isRequired,
  saveUpdate: PropTypes.func.isRequired,
  getHeight: PropTypes.func.isRequired
}

export default ListItemPresenter