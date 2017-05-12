const lastReset = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return action.resetDate
    default:
      return state
  }
}

export default lastReset