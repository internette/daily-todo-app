const win = window.require("electron").remote;
import { connect } from "react-redux";
import { send } from "redux-electron-ipc";
import SettingsPresenter from "../components/settings-presenter.js";
import { updateValues } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    notify_by_email:
      state.settings.notify_by_email !== undefined &&
      state.settings.notify_by_email === true
        ? true
        : false,
    email_address: state.settings.email_address
      ? state.settings.email_address
      : "",
    email_notification_hour: (function(){
      if(state.settings.email_notification_hour){
        if(parseInt(state.settings.email_notification_hour) > 12){
          return (parseInt(state.settings.email_notification_hour) - 12).toString()
        } else {
          return state.settings.email_notification_hour
        }
      } else {
        return "12"
      }
    })(),
    email_notification_minute: state.settings.email_notification_minute
      ? state.settings.email_notification_minute
      : '00',
    email_notification_tod: state.settings.email_notification_tod
      ? state.settings.email_notification_tod
      : "am",
    email_notification_timezone: state.settings.email_notification_timezone
      ? state.settings.email_notification_timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone,
    notify_by_text:
      state.settings.notify_by_text !== undefined &&
      state.settings.notify_by_text === true
        ? true
        : false,
    phone_number: state.settings.phone_number
      ? state.settings.phone_number
      : "",
    phone_notification_hour: (function(){
      if(state.settings.phone_notification_hour){
        if(parseInt(state.settings.phone_notification_hour) > 12){
          return (parseInt(state.settings.phone_notification_hour) - 12).toString()
        } else {
          return state.settings.phone_notification_hour
        }
      } else {
        return "12"
      }
    })(),
    phone_notification_minute: state.settings.phone_notification_minute
      ? state.settings.phone_notification_minute
      : "00",
    phone_notification_tod: state.settings.phone_notification_tod
      ? state.settings.phone_notification_tod
      : "am",
    phone_notification_timezone: state.settings.phone_notification_timezone
      ? state.settings.phone_notification_timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateValues: e => {
      let var_to_update, val_to_update;
      const elm_id = e.target.id;
      switch (elm_id) {
        case "text-notifications":
        case "email-notifications":
          var_to_update = "notify_by_" + elm_id.split("-")[0];
          val_to_update = e.target.checked;
          break;
        case "phone-number":
        case "email-address":
          var_to_update = elm_id.replace(/-/g, "_");
          val_to_update = e.target.value;
          break;
        case "phone-hour":
        case "phone-minute":
        case "email-hour":
        case "email-minute":
          const time_as_number = e.target.value;

          var_to_update =
            elm_id.split("-")[0] + "_notification_" + elm_id.split("-")[1];
          val_to_update = time_as_number;
          break;
        case "phone-time-AM":
        case "phone-time-PM":
        case "email-time-AM":
        case "email-time-PM":
          var_to_update = elm_id.split("-")[0] + "_notification_tod";
          val_to_update = elm_id.split("-")[2];
          break;
        default:
          var_to_update = "";
          val_to_update = "";
          break;
      }
      dispatch(updateValues(var_to_update, val_to_update));
      document.getElementById("error-message").className = "";
    },
    updatePrefs: (e, current_props) => {
      e.preventDefault();
      var error_state_elm = document.getElementById("error-message");
      error_state_elm.className = "";
      var settings = current_props;
      var error_message = '';
      if (settings.notify_by_email && settings.email_address.length > 0) {
        var re = /^([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;
        if (!re.test(settings.email_address)) {
          error_message = 'The provided e-mail address is invalid.'
          error_state_elm.innerText = error_message;
          error_state_elm.className = "active";
        }
      }
      if(settings.notify_by_text && settings.phone_number.length <= 0){
        error_message += error_message.length > 0 ? '\n' : '';
        error_message += 'A phone number is required.'
        error_state_elm.innerText = error_message;
        error_state_elm.className = "active";
      }
      if(settings.notify_by_email && settings.email_address.length <= 0){
        error_message += error_message.length > 0 ? '\n' : '';
        error_message += 'An e-mail address is required.'
        error_state_elm.innerText = error_message;
        error_state_elm.className = "active";
      }
      if (
        (settings.notify_by_email &&
          (parseInt(settings.email_notification_hour) > 12 ||
            parseInt(settings.email_notification_hour) < 0 ||
            parseInt(settings.email_notification_minute) > 59 ||
            parseInt(settings.email_notification_minute) < 0)) ||
        (settings.notify_by_text &&
          (parseInt(settings.phone_notification_hour) > 12 ||
            parseInt(settings.phone_notification_hour) < 0 ||
            parseInt(settings.phone_notification_minute) > 59 ||
            parseInt(settings.phone_notification_minute) < 0))
      ) {
        error_message += error_message.length > 0 ? '\n' : '';
        error_message += 'One of the provided times is not valid. Hours are between 0-12 and minutes between 0-59.'
        error_state_elm.innerText = error_message;
        error_state_elm.className = "active";
      }
      if (!/active/gi.test(error_state_elm.className)) {
        dispatch(send("updated-prefs", settings));
      }
    },
    exit: () => {
      win.getCurrentWindow().close();
    },
    minimize: () => {
      win.getCurrentWindow().minimize();
    }
  };
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(
  SettingsPresenter
);

export default Settings;
