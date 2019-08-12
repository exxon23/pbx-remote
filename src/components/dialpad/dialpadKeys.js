import React from 'react'
import PropTypes from 'prop-types'

const DialpadKeys = ({ onDialpadKeyClick }) => (
  <div className="pbx-remote__dialpad">
    {[...Array(9)].map((elem, idx) => (
      <div
        key={idx + 1}
        className="pbx-remote__dialpad-button"
        onClick={() => onDialpadKeyClick((idx + 1).toString())}
      >
        {idx + 1}
      </div>
    ))}
    {['*', '0', '#'].map(elem => (
      <div
        key={elem}
        className="pbx-remote__dialpad-button"
        onClick={() => onDialpadKeyClick(elem)}
      >
        {elem}
      </div>
    ))}
  </div>
)

DialpadKeys.propTypes = {
  onDialpadKeyClick: PropTypes.func
}

DialpadKeys.defaultProps = {
  onDialpadKeyClick: () => {}
}

export default DialpadKeys
