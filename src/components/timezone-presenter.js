import React from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

require("../styles/timezone.scss");

const TimezonePresenter = props => (
  <div className="timezone-container">
    Time zone:{" "}
    <div>
      <input type="checkbox" id={"toggle-" + props.timezone_for + "-tz"}/>
      <label htmlFor={"toggle-" + props.timezone_for + "-tz"}>
        {props.notification_timezone}
      </label>
      <div>
        <Scrollbars
          style={{ width: "100%", height: "20vh" }}
          renderThumbVertical={props => <div className="thumb-vertical" />}
        >
          <ul>
            {props.timezones.map(function(tz, i) {
              return <li key={i} onClick={()=>{ return props.changeTimezone(tz)}}>{tz}</li>;
            })}
          </ul>
        </Scrollbars>
      </div>
    </div>
  </div>
);

TimezonePresenter.propTypes = {
  timezone_for: PropTypes.string.isRequired,
  notification_timezone: PropTypes.string.isRequired,
  timezones: PropTypes.array.isRequired,
  changeTimezone: PropTypes.func.isRequired
};

export default TimezonePresenter;
