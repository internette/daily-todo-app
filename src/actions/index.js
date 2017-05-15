let nextTodoId = 0

export const init = (emitter, args) => {
  return {
    type: 'init',
    lastReset: args.resetDate,
    nextId: args.nextId,
    todoItems: args.todoItems
  }
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

export const setTopStatus= (emitter, isOnTop) => {
  return {
    type: 'on-top-check',
    isOnTop: isOnTop
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