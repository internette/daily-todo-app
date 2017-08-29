import { connect } from 'react-redux'
import { send } from 'redux-electron-ipc'
import SettingsPresenter from '../components/settings-presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePrefs: ()=> {
      dispatch(send('update-prefs', ''))
    },
    exit: () => {
      dispatch(send('app-close', ''))
    },
    minimize: () => {
      dispatch(send('minimize', ''))
    }
  }
}

const Settings = connect(mapStateToProps,mapDispatchToProps)(SettingsPresenter)

export default Settings