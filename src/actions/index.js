let nextTodoId = 0

export const init = (emitter, args) => {
  return {
    type: 'init',
    ...args
  }
}

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