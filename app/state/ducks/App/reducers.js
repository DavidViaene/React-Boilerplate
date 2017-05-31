import types from './types'
import createReducer from './../../utils/createReducer'

const initialState = {
  name: 'nobody',
}

const reducer = createReducer(initialState, {
  [types.SET_NAME]: (state, action) => {
    const { name } = action.payload
    return { ...state, name }
  },
})

export default reducer
