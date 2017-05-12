import React from 'react'
import PropTypes from 'prop-types'
import {Scrollbars} from 'react-custom-scrollbars'

require('../styles/list-item.scss')

const ListItemPresenter = ({ expanded, complete, title, details, delItem, toggleComplete, toggleDetailsVisibility }) => {
  const detailsLink = details ? <span onClick={toggleDetailsVisibility}>show details</span> : null;
  const details_elm = details ? <div className='details'>
                                  <Scrollbars autoHide
                                              style={{ width: '100%', height: "8rem" }}
                                              renderThumbVertical = {props => <div className="thumb-vertical"/>}><div>{details}</div></Scrollbars></div> : null;
  return (<div className={expanded ? 'expanded list-item' : 'list-item'}>
    <div className={'item'}>
      <a onClick={toggleComplete} className={complete ? 'completed' : ''}>{title}</a>
      {detailsLink}
      <a className='delete' onClick={delItem}>&times;</a>
    </div>
    {details_elm}
  </div>)
}

ListItemPresenter.propTypes = {
  expanded: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  delItem: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  toggleDetailsVisibility: PropTypes.func.isRequired
}

export default ListItemPresenter