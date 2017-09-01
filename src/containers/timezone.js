import { connect } from 'react-redux'
import { send } from 'redux-electron-ipc'
import {updateValues} from '../actions'
import TimezonePresenter from '../components/timezone-presenter.js';
const time_zones = [].concat.apply([], require('moment-timezone').tz.names());

const mapStateToProps = (state, ownProps) => {
  return {
    timezones: time_zones,
    timezone_for: ownProps.timezone_for,
    notification_timezone: ownProps.notification_timezone,
    is_checked: ownProps.is_checked !== undefined ? ownProps.is_checked : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTimezone: (new_val)=> {
      document.getElementById("toggle-" + ownProps.timezone_for + "-tz").checked = false
      dispatch(updateValues(ownProps.timezone_for + '_notification_timezone', new_val))
    }
  }
}

const Timezone = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimezonePresenter)

export default Timezone