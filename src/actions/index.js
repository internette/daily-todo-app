let nextTodoId = 0

export const init = (emitter, args) => {
  return {
    type: 'init',
    nextId: args.nextId,
    todoItems: args.todoItems
  }
}

export const updateItem = (emitter, args) => {
  return {
    type: 'update-item',
    nextId: args.nextId,
    todoItems: args.todoItems,
    updateType: args.updateType
  }
}

export const resetAll = (emitter, args) => {
  return {
    type: 'reset-all',
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
    attr_type: 'title_focused',
    title_focused,
    title
  }
}

export const toggleDetailsFocus = (details_focused, details) => {
  return {
    type: 'toggle-details-focus',
    attr_type: 'details_focused',
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

export const setHeight = (id, details_height) => {
  return {
    type: 'set-height',
    id,
    details_height
  }
}

export const setFormHeight = (details_height) => {
  return {
    type: 'set-form-height',
    details_height
  }
}

export const setSettings = (emitter, settings) => {
  return {
    type: 'set-settings',
    settings
  }
}