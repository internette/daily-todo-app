const menuStatus = (state = {}, action) => {
  switch (action.type) {
    case 'is-menu-expanded':
      return {
        expanded: !state.expanded
      }
    case 'on-top-check':
      console.log('****************************************')
      return {
        isOnTop: action.isOnTop
      }
    default:
      return state
  }
}

export default menuStatus