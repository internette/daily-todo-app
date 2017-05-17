let nextTodoId = 0

export const init = (emitter, args) => {
  return {
    type: 'init',
    lastReset: args.resetDate,
    nextId: args.nextId,
    todoItems: args.todoItems
  }
}

export const updateItem = (emitter, args) => {
  return {
    type: 'update-item',
    lastReset: args.resetDate,
    nextId: args.nextId,
    todoItems: args.todoItems,
    updateType: args.updateType
  }
}

export const resetAll = (emitter, args) => {
  return {
    type: 'reset-all',
    lastReset: args.resetDate,
    nextId: args.nextId,
    todoItems: args.todoItems,
    updateType: args.updateType
  }
}

export const updateDetails = (id, details) => {
  return {
    type: 'update-details',
    id,
    details
  }
}

export const setDetails = (emitter, args) => {
  return {
    type: 'set-details',
    lastReset: args.resetDate,
    nextId: args.nextId,
    todoItems: args.todoItems,
    updateType: args.updateType
  }
}

export const toggleDetailsVisibility = (id) => {
  return {
    type: 'show-details',
    attr_updated: 'expanded',
    id
  }
}

export const toggleForm = (expanded_check) => {
  return {
    type: 'toggle-form',
    expanded: expanded_check
  }
}

export const toggleTitleFocus = (title_focused, title) => {
  return {
    type: 'toggle-title-focus',
    title_focused,
    title
  }
}

export const toggleDetailsFocus = (details_focused, details) => {
  return {
    type: 'toggle-details-focus',
    details_focused,
    details
  }
}

export const setTopStatus= (emitter, isOnTop) => {
  return {
    type: 'on-top-check',
    isOnTop
  }
}

export const toggleMenu = (expanded) => {
  return {
    type: 'is-menu-expanded',
    expanded
  }
}

export const updateValues = (updated_key, updated_val) => {
  return {
    type: 'update-values',
    key: updated_key,
    val: updated_val
  }
}

export const toggleEdit = (id) => {
  return {
    type: 'toggle-edit',
    attr_updated: 'editable',
    id
  }
}