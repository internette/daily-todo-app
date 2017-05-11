let nextTodoId = 0

export const addToDo = (title, details) => {
  return {
    type: 'add-to-do',
    id: nextTodoId++,
    title,
    details
  }
}

export const delItem = (id) => {
  return {
    type: 'delete-item',
    id
  }
}

export const toggleComplete = (id) => {
  return {
    type: 'completed-action',
    id
  }
}

export const exit = (bool_val) => {
  return {
    type: 'app-close',
    bool_val
  }
}

export const isOnTop = (bool_val) => {
  return {
    type: 'app-on-top',
    bool_val
  }
}