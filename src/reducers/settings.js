const settings = (state = {}, action) => {
  switch (action.type) {
    case 'set-settings':
      return Object.assign({}, state, action.settings)
    case 'update-values':
      const obj = {}
      obj[action.key] = action.val
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

export default settings