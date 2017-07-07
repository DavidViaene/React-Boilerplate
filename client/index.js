import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './../app/views/containers/Root'
import App from './../app/views/containers/App'

ReactDOM.render(
  <AppContainer>
    <Root>
      <App />
    </Root>
  </AppContainer>
  , document.getElementById('root'),
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./../app/views/containers/Root', () => {
    const HotRoot = require('./../app/views/containers/Root').default

    ReactDOM.render(
      <AppContainer>
        <HotRoot>
          <App />
        </HotRoot>
      </AppContainer>,
      document.getElementById('root'),
    )
  })
}
