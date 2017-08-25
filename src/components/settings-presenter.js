import React from 'react'
import PropTypes from 'prop-types'

require('../styles/settings.scss');

const SettingsPresenter = ({})=> (
  <div id="subnav-cont">
    <div class="notify-opt">
      <input id="text-notifications" type="checkbox"/><label for="text-notifications"> Receive text notifications</label>
      <p>Phone Number: <input type="text" id="telephone-number"/></p>
    </div>
    <div class="notify-opt">
      <input id="email-notifications" type="checkbox"/><label for="email-notifications"> Receive email notifications</label>
      <p>E-mail Address: <input type="email" id="email"/></p>
    </div>
  </div>
)

SettingsPresenter.propTypes = {
}

export default SettingsPresenter