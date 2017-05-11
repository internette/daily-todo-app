import React from 'react'
import PropTypes from 'prop-types'

// TODO: Move titlebar styles out to own scss file
require('../styles/index.scss');

const MenuPresenter = ({expanded, isOnTop, resetTasks, toggleMenu, toggleTopStatus})=> (
  <div id="subnav-cont" className={isMenuExpanded ? 'expanded' : ''}>
    <div id="subnav-icon" onClick={toggleMenu}>&hellip;</div>
    <div id="subnav">
      <ul>
        <li onClick={resetTasks}>
          <a>Reset Tasks</a>
        </li>
        <li onClick={toggleTopStatus}>
          <a>Keep on Top<span className={isOnTop ? 'active' : ''}></span></a>
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