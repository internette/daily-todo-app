const todo = (state = {}, action) => {
  switch (action.type) {
    case 'init':
      return {
        id: action.lastId,
        title: action.title,
        details: action.details,
        complete: action.complete
      }
    case 'update-description':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        description: action.description
      })
    case 'toggle-edit':
    case 'show-details':
      if (state.id !== action.id) {
        return state
      }
      const updated_state = state
      updated_state[action.attr_updated] = !state[action.attr_updated]
      return Object.assign({}, state, updated_state)

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
        item['editable'] = false
        item['expanded'] = item_state.hasOwnProperty('expanded') ? item_state.expanded : false
        return item
      })
      return action.todoItems
    case 'set-description':
      action.todoItems.forEach(t => {
        const item = todo(t, action.todoItems)
        const item_state = state.filter((itm)=>{
          return itm.id === item.id ? itm : null
        })
        item['editable'] = false
        item['expanded'] = false
        return item
      })
      return action.todoItems
    case 'update-description':
      return state.map(t => {
        console.log(t)
        todo(t, action)
      }
    )
    case 'update-item':
      action.todoItems.map(t => {
        const item = todo(t, action.todoItems)
        const item_state = state.filter((itm)=>{
          return itm.id === item.id ? itm : null
        })[0]
        item['editable'] = false
        item['expanded'] = item_state.hasOwnProperty('expanded') ? item_state.expanded : false
        return item
      })
      return action.todoItems
    case 'toggle-edit':
    case 'show-details':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todoItems