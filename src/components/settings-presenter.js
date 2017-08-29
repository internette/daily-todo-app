import React from 'react'
import PropTypes from 'prop-types'

require('../styles/settings.scss');

const SettingsPresenter = ({exit, minimize, updatePrefs})=> (
  <div id="subnav-cont">
    <nav>
      <a id="minimize" onClick={minimize}>&mdash;</a>
      <a id="exit" onClick={exit}>&times;</a>
    </nav>
    <div className="notify-opt">
      <input id="text-notifications" type="checkbox"/><label htmlFor="text-notifications"> Receive text notifications</label>
      <p>Phone Number: <input type="text" id="telephone-number"/></p>
    </div>
    <div className="notify-opt">
      <input id="email-notifications" type="checkbox"/><label htmlFor="email-notifications"> Receive email notifications</label>
      <p>E-mail Address: <input type="email" id="email"/></p>
    </div>
    <div id="save">
      <button onClick={updatePrefs}>Save</button>
    </div>
  </div>
)

SettingsPresenter.propTypes = {
  exit: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired,
  updatePrefs: PropTypes.func.isRequired
}

export default SettingsPresenter