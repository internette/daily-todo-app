const settings = (state = {}, action) => {
  switch (action.type) {
    case 'update-email':
      return Object.assign({}, state, {
        email: action.email,
        phone_number: state.phone_number
      })
    case 'update-phone':
      return Object.assign({}, state, {
        email: state.email,
        phone_number: action.phone_number
      })
    default:
      return state
  }
}

export default settings