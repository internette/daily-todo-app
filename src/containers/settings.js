import { connect } from 'react-redux'
import { send } from 'redux-electron-ipc'
import SettingsPresenter from '../components/settings-presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

const Settings = connect(mapStateToProps,mapDispatchToProps)(SettingsPresenter)

export default Settings