export const latestStats = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return {
        resetDate: action.resetDate,
        lastId: action.lastId
      }
    default:
      return state
  }
}

export default latestStats