import React from "react";
import PropTypes from "prop-types";

require("../styles/settings.scss");

const SettingsPresenter = (props) =>
  <div id="subnav-cont">
    <nav>
      <a id="minimize" onClick={props.minimize}>&mdash;</a>
      <a id="exit" onClick={props.exit}>&times;</a>
    </nav>
    <form onSubmit={(e)=> props.updatePrefs(e, props)}>
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
            />
          </p>
          <p className="time">
            Time:{" "}
            <input
              type="number"
              id="phone-hour"
              min="1"
              max="12"
              onChange={props.updateValues}
              value={props.phone_notification_hour}
            />:<input
              type="number"
              id="phone-minute"
              min="0"
              max="59"
              onChange={props.updateValues}
              value={props.phone_notification_minute}
            />
            <span className="time-of-day">
              <input
                id="phone-time-AM"
                name="phone-time-of-day"
                type="radio"
                onChange={props.updateValues}
                checked={/am/gi.test(props.phone_notification_tod) ? true : false}
              />
              <label htmlFor="phone-time-AM">AM</label>
              <input
                id="phone-time-PM"
                name="phone-time-of-day"
                type="radio"
                onChange={props.updateValues}
                checked={/am/gi.test(props.phone_notification_tod) ? false : true}
              />
              <label htmlFor="phone-time-PM">PM</label>
            </span>
          </p>
        </div>
      </div>
      <div className="notify-opt">
        <input
          id="email-notifications"
          type="checkbox"
          onChange={props.updateValues}
          checked={props.notify_by_email}
        />
        <label htmlFor="email-notifications"> Receive email notifications</label>
        <div>
          <p>
            E-mail Address:{" "}
            <input type="text" id="email-address" onChange={props.updateValues} value={props.email_address}/>
          </p>
          <p className="time">
            Time:{" "}
            <input
              type="number"
              id="email-hour"
              min="1"
              max="12"
              onChange={props.updateValues}
              value={props.email_notification_hour}
            />:<input
              type="number"
              id="email-minute"
              min="0"
              max="59"
              onChange={props.updateValues}
              value={props.email_notification_minute}
            />
            <span className="time-of-day">
              <input
                id="email-time-AM"
                name="email-time-of-day"
                type="radio"
                onChange={props.updateValues}
                checked={/am/gi.test(props.email_notification_tod) ? true : false}
              />
              <label htmlFor="email-time-AM">AM</label>
              <input
                id="email-time-PM"
                name="email-time-of-day"
                type="radio"
                onChange={props.updateValues}
                checked={/am/gi.test(props.email_notification_tod) ? false : true}
              />
              <label htmlFor="email-time-PM">PM</label>
            </span>
          </p>
        </div>
        <div id="error-message">
          <p>There is an error somewhere. Please fix and try again.</p>
        </div>
      </div>
      <div id="save">
        <button type="submit">Save</button>
      </div>
    </form>
  </div>

SettingsPresenter.propTypes = {
  notify_by_email: PropTypes.bool.isRequired,
  email_address: PropTypes.string.isRequired,
  email_notification_hour: PropTypes.number.isRequired,
  email_notification_minute: PropTypes.number.isRequired,
  email_notification_tod: PropTypes.string.isRequired,
  email_notification_timezone: PropTypes.string.isRequired,
  notify_by_text: PropTypes.bool.isRequired,
  phone_number: PropTypes.string.isRequired,
  phone_notification_hour: PropTypes.number.isRequired,
  phone_notification_minute: PropTypes.number.isRequired,
  phone_notification_tod: PropTypes.string.isRequired,
  phone_notification_timezone: PropTypes.string.isRequired,
  exit: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired,
  updatePrefs: PropTypes.func.isRequired,
  updateValues: PropTypes.func.isRequired
};

export default SettingsPresenter;
