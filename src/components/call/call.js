import React, { useContext } from 'react'
import { useMutation } from 'react-apollo-hooks'

import { MUTATION_ENDCALL, MUTATION_DTMFSIGNAL } from '../../graphql/mutations'
import { Context } from '../../context/context'
import { TimeCounter } from '../../utils'
import DialpadKeys from './callDialpadKeys'
import DialpadControls from './callDialpadControls'
import './call.scss'

const Call = () => {
  const {
    dialpadActive,
    activeCall: { number, entryTime },
    showDialpad,
    setDTMFSignal
  } = useContext(Context)

  const makeEndCallMutation = useMutation(MUTATION_ENDCALL)
  const makeDtmfSignalMutation = useMutation(MUTATION_DTMFSIGNAL)

  const handleEndCall = () => {
    makeEndCallMutation()
    showDialpad(false)
  }

  const handleDialpadKeyClick = key => {
    setDTMFSignal(number + key)
    makeDtmfSignalMutation({
      variables: { signal: key }
    })
  }

  return (
    <div className="pbx-remote__call-wrapper">
      <div>
        <p className="pbx-remote__call-number">{number}</p>
        <span className="pbx-remote__call-duration">
          <TimeCounter format="mm:ss" initialTime={entryTime} />
        </span>
      </div>
      {dialpadActive && <DialpadKeys onDialKeyClick={handleDialpadKeyClick} />}
      <DialpadControls onCallEnd={handleEndCall} />
    </div>
  )
}

export default Call
