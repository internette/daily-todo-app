export const latestStats = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return {
        resetDate: action.resetDate,
        nextId: action.nextId
      }
    default:
      return state
  }
}

export default latestStats