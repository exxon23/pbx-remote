import React from 'react'
import PropTypes from 'prop-types'

const DialpadControls = ({ onCallEnd, onTransferCall, onHoldCall, isHolded }) => {
  return (
    <div className="pbx-remote__call-controls">
      <div className="pbx-remote__call-controls-secondary">
        <button className="pbx-remote__call-controls-secondary-btn" onClick={onTransferCall}>
          <i className="material-icons">phone_forwarded</i>
          <label>Propojit</label>
        </button>
        <button
          className="pbx-remote__call-controls-secondary-btn"
          style={{ color: isHolded && 'rgb(175, 191, 39)' }}
          onClick={onHoldCall}
        >
          <i className="material-icons">pause</i>
          <label>Podržet</label>
        </button>
      </div>
      <div>
        <button className="pbx-remote__callend-btn" onClick={onCallEnd}>
          <i className="material-icons">call_end</i>
        </button>
      </div>
    </div>
  )
}

DialpadControls.propTypes = {
  onCallEnd: PropTypes.func.isRequired,
  onTransferCall: PropTypes.func.isRequired,
  onHoldCall: PropTypes.func.isRequired,
  isHolded: PropTypes.bool
}
export default DialpadControls
