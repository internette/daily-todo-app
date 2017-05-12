const todo = (state = {}, action) => {
  switch (action.type) {
    case 'init':
      return {
        id: action.lastId,
        title: action.title,
        details: action.details,
        complete: action.complete
      }
    case 'show-details':
      return Object.assign({}, state, {
        expanded: !state.expanded
      })

    case 'completed-action':
      return Object.assign({}, state, {
        complete: !state.complete
      })

    default:
      return state
  }
}

const todoItems = (state = [], action) => {
  switch (action.type) {
    case 'init':
      action.todoItems.forEach(t => {
        const item = todo(t, action.todoItems)
        item['expanded'] = false
        return item
      })
      return action.todoItems
    case 'show-details':
    case 'completed-action':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todoItems