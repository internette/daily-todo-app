import React from "react";
import PropTypes from "prop-types";

require("../styles/timezone.scss");

const TimezonePresenter = props => (
  <div className="timezone-container">
    Time zone:{" "}
    <div>
      <input type="checkbox" id={"toggle-"+props.timezone_for+"-tz"} />
      <label htmlFor={"toggle-"+props.timezone_for+"-tz"}>
        {props.notification_timezone}
      </label>
      <div>
        <ul>
          {
            props.timezones.map(function(tz, i){
              return <li key={i}>{tz}</li>
            })
          }
        </ul>
      </div>
    </div>
  </div>
          
);

TimezonePresenter.propTypes = {
  timezone_for: PropTypes.string.isRequired,
  notification_timezone: PropTypes.string.isRequired,
  timezones: PropTypes.array.isRequired
};

export default TimezonePresenter;
