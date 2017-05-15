import React from 'react'
import PropTypes from 'prop-types'

require('../styles/menu.scss');

const MenuPresenter = (props)=> (
  <div id="subnav-cont" className={props.expanded ? 'expanded' : null}>
    <div id="subnav-icon" onClick={props.toggleMenu}>&hellip;</div>
    <div id="subnav">
      <ul>
        <li onClick={props.resetTasks}>
          <a>Reset Tasks</a>
        </li>
        <li onClick={()=> props.toggleTopStatus(props.isOnTop)}>
          <a>Keep on Top<span className={props.isOnTop ? 'active' : null}></span></a>
        </li>
      </ul>
    </div>
  </div>
)

MenuPresenter.propTypes = {
  expanded: PropTypes.bool.isRequired,
  isOnTop: PropTypes.bool.isRequired,
  resetTasks: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleTopStatus: PropTypes.func.isRequired
}

export default MenuPresenter