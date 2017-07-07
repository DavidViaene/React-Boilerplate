import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import configureStore from './../../../state/store'

const store = configureStore({})

const Root = props => (
  <Provider store={store}>
    <Router>{ props.children }</Router>
  </Provider>
)

export default Root
