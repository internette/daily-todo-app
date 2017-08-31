import { connect } from 'react-redux'
import TimezonePresenter from '../components/timezone-presenter.js';
const time_zones = [].concat.apply([], require('moment-timezone').tz.names());

const mapStateToProps = (state, ownProps) => {
  return {
    timezones: time_zones,
    timezone_for: ownProps.timezone_for,
    notification_timezone: ownProps.notification_timezone
  }
}

const Timezone = connect(
  mapStateToProps
)(TimezonePresenter)

export default Timezone