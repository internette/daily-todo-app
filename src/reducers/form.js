const formActions = (state = {}, action) => {
  switch (action.type) {
    case 'toggle-form':
      return Object.assign({}, state, {
        title: '',
        details: '',
        expanded: !state.expanded
      })
    case 'toggle-title-focus':
      return Object.assign({}, state, {
        title_focused: !state.title_focused
      })
    case 'toggle-details-focus':
      return Object.assign({}, state, {
        details_focused: !state.details_focused
      })
    case 'update-values':
      const obj = {}
      obj[action.key] = action.val
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

export default formActions