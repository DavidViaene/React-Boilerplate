import React from 'react'
import ReactDOM from 'react-dom'

import routes from './../app/routes'

import { Router, Route, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('root')
)
