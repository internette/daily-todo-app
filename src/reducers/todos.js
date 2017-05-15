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

    case 'update-item':
      return Object.assign({}, state, {
        complete: action.complete
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
    case 'update-item':
      action.todoItems.map(t => {
        const item = todo(t, action.todoItems)
        item['expanded'] = false
        console.log(item)
        return item
      })
      return action.todoItems
    default:
      return state
  }
}

export default todoItems