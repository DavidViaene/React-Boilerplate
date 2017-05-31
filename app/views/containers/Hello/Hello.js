import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AppActions } from './../../../state/ducks/App'

const Hello = (props) => {
  const { name, actions } = props

  return (
    <div>{ name }</div>
  )
}

Hello.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({ actions: bindActionCreators(AppActions, dispatch) }),
)(Hello)
