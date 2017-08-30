const win = window.require('electron').remote;
import { connect } from 'react-redux'
import { send } from 'redux-electron-ipc'
import SettingsPresenter from '../components/settings-presenter.js'
import {updateValues} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    notify_by_email: state.settings.notify_by_email !== undefined && state.settings.notify_by_email === true ? true : false,
    email_address: state.settings.email_address ? state.settings.email_address : '',
    email_notification_hour: state.settings.email_notification_hour ? state.settings.email_notification_hour : 12,
    email_notification_minute: state.settings.email_notification_minute ? state.settings.email_notification_minute : 0,
    email_notification_tod: state.settings.email_notification_tod ? state.settings.email_notification_tod : 'am',
    email_notification_timezone: state.settings.email_notification_timezone ? state.settings.email_notification_timezone : '',
    notify_by_text: state.settings.notify_by_text !== undefined && state.settings.notify_by_text === true ? true : false,
    phone_number: state.settings.phone_number ? state.settings.phone_number : '',
    phone_notification_hour: state.settings.phone_notification_hour ? state.settings.phone_notification_hour : 12,
    phone_notification_minute: state.settings.phone_notification_minute ? state.settings.phone_notification_minute : 0,
    phone_notification_tod: state.settings.phone_notification_tod ? state.settings.phone_notification_tod : 'am',
    phone_notification_timezone: state.settings.phone_notification_timezone ? state.settings.phone_notification_timezone : ''
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateValues: (e)=> {
      let var_to_update, val_to_update;
      const elm_id = e.target.id;
      switch(elm_id){
        case 'text-notifications':
        case 'email-notifications':
          var_to_update = 'notify_by_' + elm_id.split('-')[0];
          val_to_update = e.target.checked;
          break;
        case 'phone-number':
        case 'email-address':
          var_to_update = elm_id.replace(/-/g, '_');
          val_to_update = e.target.value;
          break;
        case 'phone-hour':
        case 'phone-minute':
        case 'email-hour':
        case 'email-minute':
          var_to_update = elm_id.split('-')[0] + '_notification_' + elm_id.split('-')[1];
          val_to_update = e.target.value;
          break;
        case 'phone-time-AM':
        case 'phone-time-PM':
        case 'email-time-AM':
        case 'email-time-PM':
          var_to_update = elm_id.split('-')[0] + '_notification_tod';
          val_to_update = elm_id.split('-')[2];
          break;
        default:
          var_to_update = '';
          val_to_update = '';
          break;
      }
      dispatch(updateValues(var_to_update, val_to_update));
      document.getElementById('error-message').className = '';
      setTimeout(function(){
        return win.getCurrentWindow().setSize(400, 350, true);
      }, 200);
    },
    updatePrefs: (e, current_props) => {
      e.preventDefault();
      var error_state_elm = document.getElementById('error-message');
      error_state_elm.className = '';
      if(current_props.notify_by_email && current_props.email_address.length > 0){
        var re = /^([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;
        if(re.test(current_props.email_address)){
          dispatch(send('update-prefs', current_props));
        }
      } else if(current_props.notify_by_text && current_props.phone_number.length > 0){
        dispatch(send('update-prefs', current_props));
      } else if (!current_props.notify_by_email && !current_props.notify_by_text){
        dispatch(send('update-prefs', current_props));
      } else {
        error_state_elm.className = 'active';
        win.getCurrentWindow().setSize(400, 440, true);
      }
    },
    exit: () => {
      win.getCurrentWindow().close();
    },
    minimize: () => {
      win.getCurrentWindow().minimize();
    }
  }
}

const Settings = connect(mapStateToProps,mapDispatchToProps)(SettingsPresenter)

export default Settings