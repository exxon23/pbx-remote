import React from 'react'
import PropTypes from 'prop-types'

const DialpadKeys = ({ dialNumber, onDialNumberChange }) => (
  <div className="pbx-remote__dialpad">
    {[...Array(9)].map((elem, idx) => (
      <div
        key={idx + 1}
        className="pbx-remote__dialpad-button"
        onClick={() => onDialNumberChange(dialNumber + (idx + 1).toString())}
      >
        {idx + 1}
      </div>
    ))}
    {['*', '0', '#'].map(elem => (
      <div
        key={elem}
        className="pbx-remote__dialpad-button"
        onClick={() => onDialNumberChange(dialNumber + elem)}
      >
        {elem}
      </div>
    ))}
  </div>
)

DialpadKeys.propTypes = {
  dialNumber: PropTypes.string,
  onDialNumberChange: PropTypes.func
}

DialpadKeys.defaultProps = {
  onDialNumberChange: () => {}
}

export default DialpadKeys
