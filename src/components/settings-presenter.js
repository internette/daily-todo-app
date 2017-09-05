import React from "react";
import PropTypes from "prop-types";
import Timezone from "../containers/timezone.js"

require("../styles/settings.scss");

const SettingsPresenter = props => (
  <div id="subnav-cont">
    <nav>
      <a id="minimize" onClick={props.minimize}>
        &mdash;
      </a>
      <a id="exit" onClick={props.exit}>
        &times;
      </a>
    </nav>
    <form onSubmit={e => {e.preventDefault();}}>
      <div className="notify-opt">
        <input
          id="text-notifications"
          type="checkbox"
          onChange={props.updateValues}
          checked={props.notify_by_text}
        />
        <label htmlFor="text-notifications"> Receive text notifications</label>
        <div>
          <p>
            Phone Number:{" "}
            <input
              type="text"
              id="phone-number"
              onChange={props.updateValues}
              value={props.phone_number}
              readOnly={!props.notify_by_text}
            />
          </p>
          <p className="time">
            Time:{" "}
            <input
              type="text"
              id="phone-hour"
              pattern="[0-12]{2}"
              onChange={props.updateValues}
              value={props.phone_notification_hour}
              readOnly={!props.notify_by_text}
            />:<input
              type="text"
              id="phone-minute"
              pattern="[0-59]{2}"
              onChange={props.updateValues}
              value={props.phone_notification_minute}
              readOnly={!props.notify_by_text}
            />
            <span className="time-of-day">
              <input
                id="phone-time-AM"
                name="phone-time-of-day"
                type="radio"
                onChange={props.updateValues}
                disabled={!props.notify_by_text}
                checked={
                  /am/gi.test(props.phone_notification_tod) ? true : false
                }
              />
              <label htmlFor="phone-time-AM">AM</label>
              <input
                id="phone-time-PM"
                name="phone-time-of-day"
                type="radio"
                onChange={props.updateValues}
                disabled={!props.notify_by_text}
                checked={
                  /am/gi.test(props.phone_notification_tod) ? false : true
                }
              />
              <label htmlFor="phone-time-PM">PM</label>
            </span>
          </p>
          <div>
            <Timezone timezone_for='phone' notification_timezone={props.phone_notification_timezone} clickEvent={props.updateValues} is_checked={false}/>
          </div>
        </div>
      </div>
      <div className="notify-opt">
        <input
          id="email-notifications"
          type="checkbox"
          onChange={props.updateValues}
          checked={props.notify_by_email}
        />
        <label htmlFor="email-notifications">
          {" "}
          Receive email notifications
        </label>
        <div>
          <p>
            E-mail Address:{" "}
            <input
              type="text"
              id="email-address"
              onChange={props.updateValues}
              value={props.email_address}
              readOnly={!props.notify_by_email}
            />
          </p>
          <p className="time">
            Time:{" "}
            <input
              type="text"
              id="email-hour"
              pattern="[0-12]{2}"
              onChange={props.updateValues}
              value={props.email_notification_hour}
              readOnly={!props.notify_by_email}
            />:<input
              type="text"
              id="email-minute"
              pattern="[0-59]{2}"
              onChange={props.updateValues}
              value={props.email_notification_minute}
              readOnly={!props.notify_by_email}
            />
            <span className="time-of-day">
              <input
                id="email-time-AM"
                name="email-time-of-day"
                type="radio"
                onChange={props.updateValues}
                disabled={!props.notify_by_email}
                checked={
                  /am/gi.test(props.email_notification_tod) ? true : false
                }
              />
              <label htmlFor="email-time-AM">AM</label>
              <input
                id="email-time-PM"
                name="email-time-of-day"
                type="radio"
                onChange={props.updateValues}
                disabled={!props.notify_by_email}
                checked={
                  /am/gi.test(props.email_notification_tod) ? false : true
                }
              />
              <label htmlFor="email-time-PM">PM</label>
            </span>
          </p>
          <div>
            <Timezone timezone_for='email' notification_timezone={props.email_notification_timezone} clickEvent={props.updateValues}/>
          </div>
        </div>
        <div id="error-message">
          <p>There is an error somewhere. Please fix and try again.</p>
        </div>
      </div>
      <div id="save">
        <a id="form-submit" onClick={e => props.updatePrefs(e, props)}>Save</a>
      </div>
    </form>
  </div>
);

SettingsPresenter.propTypes = {
  notify_by_email: PropTypes.bool.isRequired,
  email_address: PropTypes.string.isRequired,
  email_notification_hour: PropTypes.string.isRequired,
  email_notification_minute: PropTypes.string.isRequired,
  email_notification_tod: PropTypes.string.isRequired,
  email_notification_timezone: PropTypes.string.isRequired,
  notify_by_text: PropTypes.bool.isRequired,
  phone_number: PropTypes.string.isRequired,
  phone_notification_hour: PropTypes.string.isRequired,
  phone_notification_minute: PropTypes.string.isRequired,
  phone_notification_tod: PropTypes.string.isRequired,
  phone_notification_timezone: PropTypes.string.isRequired,
  exit: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired,
  updatePrefs: PropTypes.func.isRequired,
  updateValues: PropTypes.func.isRequired
};

export default SettingsPresenter;
