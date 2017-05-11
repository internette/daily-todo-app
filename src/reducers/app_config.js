const appConfig = (state = [], action) => {
  switch (action.type) {
    case 'app-on-top':
      return {
        isOnTop: !state.isOnTop
      }
    default:
      return state
  }
}

export default appConfig