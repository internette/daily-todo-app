const menuStatus = (state = {}, action) => {
  switch (action.type) {
    case 'init':
    case 'reset-all':
      return Object.assign({}, state, {
        expanded: false
      })
    case 'is-menu-expanded':
      return Object.assign({}, state, {
        expanded: !state.expanded
      })
    case 'on-top-check':
      return Object.assign({}, state, {
        expanded: false,
        isOnTop: action.isOnTop
      })
    default:
      return state
  }
}

export default menuStatus