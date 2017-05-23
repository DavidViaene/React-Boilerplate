import types from './types'

export const setName = name => ({
  type: types.SET_NAME,
  payload: {
    name,
  },
})

export default {
  setName,
}
