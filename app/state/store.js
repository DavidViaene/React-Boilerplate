import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import * as reducers from './ducks'

export default function configureStore(initialState = {}) {
  const loggerMiddleware = createLogger()
  const rootReducer = combineReducers(reducers)

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggerMiddleware,
    ),
  )
}
