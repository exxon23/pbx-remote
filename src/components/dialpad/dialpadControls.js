import React from 'react'
import PropTypes from 'prop-types'

const DialpadControls = ({ dialNumber, onDialNumberChange, onMakeCall }) => (
  <div className="pbx-remote__dialpad-control">
    <button className="pbx-remote__dialpad-back-btn" onClick={() => onDialNumberChange('')}>
      <i className="material-icons">cancel</i>
    </button>
    <button className="pbx-remote__dialpad-call-btn" onClick={onMakeCall}>
      <i className="material-icons">call</i>
    </button>
    <button
      className="pbx-remote__dialpad-back-btn"
      onClick={() => onDialNumberChange(dialNumber.slice(0, -1))}
    >
      <i className="material-icons">backspace</i>
    </button>
  </div>
)

DialpadControls.propTypes = {
  dialNumber: PropTypes.string,
  onDialNumberChange: PropTypes.func.isRequired,
  onMakeCall: PropTypes.func.isRequired
}

DialpadControls.defaultProps = {
  onDialNumberChange: () => {},
  onMakeCall: () => {}
}

export default DialpadControls
