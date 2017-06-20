import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './../app/views/containers/Root'
import configureStore from './../app/state/store'

const store = configureStore({})

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root'),
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./../app/views/containers/Root', () => {
    const HotRoot = require('./../app/views/containers/Root').default
    ReactDOM.render(
      <AppContainer>
        <HotRoot store={store} />
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
