import React from 'react'
import PropTypes from 'prop-types'
import {Scrollbars} from 'react-custom-scrollbars'

require('../styles/list-item.scss')

const ListItemPresenter = ( props ) => {
  const detailsLink = props.details ? <span onClick={()=>{props.toggleDetailsVisibility(props.id)}} className="toggle-detail-visibility">show details</span> : null;
  const details_elm = props.details ? <div className='details'>
                                  <Scrollbars autoHide
                                              style={{ width: '100%', height: "8rem" }}
                                              renderThumbVertical = {props => <div className="thumb-vertical"/>}><div>{props.details}</div></Scrollbars></div> : null;
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
  title: PropTypes.string.isRequired,
  delItem: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toggleDetailsVisibility: PropTypes.func.isRequired
}

export default ListItemPresenter