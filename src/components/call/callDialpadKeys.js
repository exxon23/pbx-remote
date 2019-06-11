import React from 'react'
import PropTypes from 'prop-types'

const DialpadKeys = ({ onDialKeyClick }) => (
  <div className="pbx-remote__dialpad">
    {[...Array(9)].map((elem, idx) => (
      <div
        key={idx + 1}
        className="pbx-remote__dialpad-button"
        onClick={() => onDialKeyClick((idx + 1).toString())}
      >
        {idx + 1}
      </div>
    ))}
    {['*', '0', '#'].map(elem => (
      <div key={elem} className="pbx-remote__dialpad-button" onClick={() => onDialKeyClick(elem)}>
        {elem}
      </div>
    ))}
  </div>
)

DialpadKeys.propTypes = {
  onDialKeyClick: PropTypes.func.isRequired
}
export default DialpadKeys
