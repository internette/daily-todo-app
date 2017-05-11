import React from 'react'
import PropTypes from 'prop-types'
import Menu from "../containers/menu.js"

// TODO: Move titlebar styles out to own scss file
require('../styles/index.scss');

const TitleBarPresenter = ({exit})=> (
  <h1><span>Daily</span>_ToDo<Menu/><a id="exit" onClick={exit()}>&times;</a></h1>
)

TitleBarPresenter.propTypes = {
  exit: PropTypes.func.isRequired
}

export default TitleBarPresenter