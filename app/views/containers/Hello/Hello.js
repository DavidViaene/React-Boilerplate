import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Hello = (props) => {
  const { name } = props

  return (
    <div>{ name }</div>
  )
}


Hello.propTypes = {
  name: PropTypes.string.isRequired,
}

export default connect(
  state => ({ name: state.name }),
  dispatch => ({ actions: bindActionCreators({}, dispatch) }),
)(Hello)
