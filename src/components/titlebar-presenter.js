import React from 'react'
import PropTypes from 'prop-types'
import Menu from "../containers/menu.js"

// TODO: Move titlebar styles out to own scss file
require('../styles/index.scss');

const TitleBarPresenter = ({exit, minimize})=> (
  <h1><span>Daily</span>_ToDo<nav><Menu/><a id="minimize" onClick={minimize}>&mdash;</a><a id="exit" onClick={exit}>&times;</a></nav></h1>
)

TitleBarPresenter.propTypes = {
  exit: PropTypes.func.isRequired,
  minimize: PropTypes.func.isRequired
}

export default TitleBarPresenter