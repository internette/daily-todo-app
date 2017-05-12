let nextTodoId = 0

export const init = (emitter, args) => {
  return {
    type: 'init',
    lastReset: args.resetDate,
    lastId: args.lastId,
    todoItems: args.todoItems
  }
}

export const addItem = (title, details) => {
  const new_item = {
    type: 'add-to-do',
    id: nextTodoId++,
    title,
    details,
    complete: false
  }
  return new_item
}

export const delItem = (id) => {
  return {
    type: 'delete-item',
    id: id
  }
}

export const toggleComplete = (id) => {
  return {
    type: 'completed-action',
    id: id
  }
}

export const toggleDetailsVisibility = (expand_check) => {
  return {
    type: 'show-details',
    expanded: expand_check
  }
}

export const toggleForm = (expanded_check) => {
  return {
    type: 'toggle-form',
    expanded: expanded_check
  }
}

export const toggleTitleFocus = (focus_check, title) => {
  return {
    type: 'toggle-title-focus',
    title_focused: focus_check,
    title: title
  }
}

export const toggleDetailsFocus = (focus_check, details) => {
  return {
    type: 'toggle-details-focus',
    details_focused: focus_check,
    details: details
  }
}

export const exit = (bool_val) => {
  return {
    type: 'app-close',
    bool_val
  }
}

export const toggleTopStatus = (ontop_check) => {
  return {
    type: 'app-on-top',
    isOnTop: ontop_check
  }
}

export const toggleMenu = (expanded_check) => {
  return {
    type: 'is-menu-expanded',
    expanded: expanded_check
  }
}

export const updateValues = (updated_key, updated_val) => {
  return {
    type: 'update-values',
    key: updated_key,
    val: updated_val
  }
}

export const getLastId = (id)=> {
  return {
    type: 'last-id',
    id
  }
}