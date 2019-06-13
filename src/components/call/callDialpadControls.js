import React from 'react'
import PropTypes from 'prop-types'

const DialpadControls = ({ onCallEnd }) => (
  <button className="pbx-remote__callend-btn" onClick={onCallEnd}>
    <i className="material-icons">call_end</i>
  </button>
)

DialpadControls.propTypes = {
  onCallEnd: PropTypes.func.isRequired
}
export default DialpadControls
