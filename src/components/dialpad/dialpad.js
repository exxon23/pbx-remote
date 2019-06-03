import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import { Context } from '../../context/context'
import './dialpad.scss'

const MUTATION_CALL = gql`
  mutation makeCall($number: String!) {
    sendRemoteCommand(command: makeCall, parameters: { number: $number })
  }
`
// TODO: add mutation for call end
// const END_CALL

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
  </div>
)

DialpadKeys.propTypes = {
  dialNumber: PropTypes.string,
  onDialNumberChange: PropTypes.func
}

DialpadKeys.defaultProps = {
  onDialNumberChange: () => {}
}

// content of this component is based on global state - if user is not calling, show makeCall button
// if user is calling, show endCall button
// TODO: logic for DTMF when user is calling
const DialpadControls = ({ isCalling, dialNumber, onDialNumberChange, onMakeCall }) =>
  !isCalling && (
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
  isCalling: PropTypes.bool,
  onDialNumberChange: PropTypes.func.isRequired,
  onMakeCall: PropTypes.func.isRequired
}

DialpadControls.defaultProps = {
  onDialNumberChange: () => {},
  onMakeCall: () => {}
}

const Dialpad = () => {
  // TODO: remove strings from number
  const [dialNumber, setDialNumber] = useState('') // local state for dialpad number
  const {
    isCalling: { number },
    setCallInfo
  } = useContext(Context)

  const makeCallMutation = useMutation(MUTATION_CALL, {
    variables: { number }
  })

  const handleMakeCall = () => {
    setCallInfo({ number: dialNumber, direction: 'outgoing' })
    makeCallMutation()
  }

  return (
    <div className="pbx-remote__dialpad-wrapper">
      <input
        className="pbx-remote__dialpad-input"
        type="text"
        value={dialNumber}
        onChange={e => setDialNumber(e.target.value)}
      />
      <DialpadKeys dialNumber={dialNumber} onDialNumberChange={setDialNumber} />
      <DialpadControls
        dialNumber={dialNumber}
        isCalling={!!number}
        onDialNumberChange={setDialNumber}
        onMakeCall={handleMakeCall}
      />
    </div>
  )
}

export default Dialpad
