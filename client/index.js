import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from './../app/routes'
import configureStore from './../app/state/store'

const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('root'),
)
