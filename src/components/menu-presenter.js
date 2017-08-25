import React from 'react'
import PropTypes from 'prop-types'

require('../styles/menu.scss');

const MenuPresenter = ({expanded, toggleMenu, resetTasks, toggleTopStatus, isOnTop, deleteTasks, getSettings})=> (
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
        <li onClick={deleteTasks}>
          <a>Delete Tasks</a>
        </li>
      </ul>
    </div>
  </div>
)

MenuPresenter.propTypes = {
  expanded: PropTypes.bool,
  isOnTop: PropTypes.bool.isRequired,
  resetTasks: PropTypes.func.isRequired,
  deleteTasks: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleTopStatus: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired
}

export default MenuPresenter