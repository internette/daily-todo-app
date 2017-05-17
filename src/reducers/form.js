const formActions = (state = {}, action) => {
  switch (action.type) {
    case 'set-form-height':
      return Object.assign({}, state, {
        details_height: `${action.details_height}px`
      })
    case 'toggle-form':
      return Object.assign({}, state, {
        title: '',
        details: '',
        expanded: !state.expanded
      })
    case 'toggle-title-focus':
    case 'toggle-details-focus':
      const attr_obj = {}
      attr_obj[action.attr_type] = !state[action.attr_type]
      return Object.assign({}, state, attr_obj)
    case 'update-values':
      const obj = {}
      obj[action.key] = action.val
      return Object.assign({}, state, obj)
    default:
      return state
  }
}

export default formActions