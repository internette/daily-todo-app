import React from 'react'
import PropTypes from 'prop-types'

require('../styles/menu.scss');

const MenuPresenter = ({expanded, isOnTop, resetTasks, toggleMenu, toggleTopStatus})=> (
  <div id="subnav-cont" className={expanded ? 'expanded' : null}>
    <div id="subnav-icon" onClick={toggleMenu}>&hellip;</div>
    <div id="subnav">
      <ul>
        <li onClick={resetTasks}>
          <a>Reset Tasks</a>
        </li>
        <li onClick={toggleTopStatus}>
          <a>Keep on Top<span className={isOnTop ? 'active' : null}></span></a>
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