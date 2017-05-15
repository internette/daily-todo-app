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
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        expanded: !state.expanded
      })
    case 'update-item':
      if (state.id !== action.id) {
        return state
      }
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
        const item_state = state.filter((itm)=>{
          return itm.id === item.id ? itm : null
        })
        item['expanded'] = item_state.hasOwnProperty('expanded') ? item_state.expanded : false
        return item
      })
      return action.todoItems
    case 'update-item':
      action.todoItems.map(t => {
        const item = todo(t, action.todoItems)
        const item_state = state.filter((itm)=>{
          return itm.id === item.id ? itm : null
        })[0]
        item['expanded'] = item_state.hasOwnProperty('expanded') ? item_state.expanded : false
        return item
      })
      return action.todoItems
    case 'show-details':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todoItems