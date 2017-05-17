const todo = (state = {}, action) => {
  switch (action.type) {
    case 'init':
    case 'set-details':
    case 'reset-all':
      return {
        id: action.lastId,
        title: action.title,
        details: action.details,
        complete: action.complete
      }
    case 'update-details':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        details: action.details
      })
    case 'toggle-edit':
    case 'show-details':
      if (state.id !== action.id) {
        return state
      }
      const updated_state = state
      updated_state[action.attr_updated] = !state[action.attr_updated]
      return Object.assign({}, state, updated_state)
    case 'set-height':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        details_height: `${action.details_height}px`
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
        item['editable'] = false
        item['expanded'] = item_state.hasOwnProperty('expanded') ? item_state.expanded : false
        return item
      })
      return action.todoItems
    case 'set-details':
      action.todoItems.forEach(t => {
        const item = todo(t, action.todoItems)
        item['editable'] = false
        item['expanded'] = true
        return item
      })
      return action.todoItems
    case 'reset-all':
      action.todoItems.forEach(t => {
        const item = todo(t, action.todoItems)
        item['editable'] = false
        item['expanded'] = false
        item['complete'] = false
        return item
      })
      return action.todoItems
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
    case 'update-details':
    case 'toggle-edit':
    case 'show-details':
    case 'set-height':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todoItems