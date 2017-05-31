const createReducer = (initialState, logic) => {
  const handleAction = (state = initialState, action) => {
    if (logic.hasOwnProperty(action.type)) {
      return logic[action.type]
    }

    return state
  }

  return handleAction
}

export default createReducer
