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

export const toggleEdit = (id) => {
  return {
    type: 'toggle-edit',
    attr_updated: 'editable',
    id
  }
}