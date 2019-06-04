import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ reason }) => (
  <div
    style={{
      position: 'absolute',
      width: '100%',
      top: 0,
      color: 'white',
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: 'red',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      zIndex: 999
    }}
  >
    Error: {reason}
  </div>
)

Error.propTypes = {
  reason: PropTypes.string.isRequired
}

export default Error
