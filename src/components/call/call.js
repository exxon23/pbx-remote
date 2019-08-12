import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import {
  MUTATION_ENDCALL,
  MUTATION_DTMFSIGNAL,
  MUTATION_TOGGLEHOLDONCALL
} from '../../graphql/mutations'
import { Context } from '../../context/context'
import { TimeCounter } from '../../utils'
import DialpadKeys from '../dialpad/dialpadKeys'
import DialpadControls from './callDialpadControls'
import './call.scss'

const Call = () => {
  const {
    dialpadActive,
    activeCall: { number, entryTime, isHolded },
    showDialpad,
    setDTMFSignal,
    setActivePage
  } = useContext(Context)

  const [makeEndCallMutation] = useMutation(MUTATION_ENDCALL)
  const [makeDtmfSignalMutation] = useMutation(MUTATION_DTMFSIGNAL)
  const [toggleHoldCallMutation] = useMutation(MUTATION_TOGGLEHOLDONCALL)

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
      {dialpadActive && <DialpadKeys onDialpadKeyClick={handleDialpadKeyClick} />}
      <DialpadControls
        isHolded={isHolded}
        onCallEnd={handleEndCall}
        onHoldCall={toggleHoldCallMutation}
        onTransferCall={() => setActivePage('transfer')}
      />
    </div>
  )
}

export default Call
