const todo = (state = {}, action) => {
  switch (action.type) {
    case 'add-to-do':
      return {
        id: action.id,
        title: action.title,
        details: action.details,
        completed: false
      }
    case 'completed-action':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const todoItems = (state = [], action) => {
  switch (action.type) {
    case 'init':
      return action.todoItems
    case 'add-to-do':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'completed-action':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todoItems