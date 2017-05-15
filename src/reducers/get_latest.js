export const latestStats = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return Object.assign({}, state, {
        resetDate: action.resetDate,
        nextId: action.nextId
      })
    default:
      return state
  }
}

export default latestStats