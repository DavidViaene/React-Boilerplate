import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AppActions } from './../../../state/ducks/App'

const App = (props) => {
  const { name } = props

  return (
    <div>{ name }</div>
  )
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({ actions: bindActionCreators(AppActions, dispatch) }),
)(App)
