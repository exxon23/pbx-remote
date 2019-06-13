import React, { useContext } from 'react'
import { useMutation } from 'react-apollo-hooks'

import { MUTATION_REJECTCALL, MUTATION_ANSWERCALL } from '../../graphql/mutations'
import { Context } from '../../context/context'
import './ringing.scss'

const Ringing = () => {
  const {
    activeCall: { number }
  } = useContext(Context)

  const answerCallMutation = useMutation(MUTATION_ANSWERCALL)
  const rejectCallMutation = useMutation(MUTATION_REJECTCALL)

  return (
    <div className="pbx-remote__ringing-wrapper">
      <p className="pbx-remote__ringing-number">{number}</p>
      <div className="pbx-remote__ringing-buttons">
        <button className="pbx-remote__call-accept-btn" onClick={answerCallMutation}>
          <i className="material-icons">call</i>
        </button>
        <button className="pbx-remote__call-decline-btn" onClick={rejectCallMutation}>
          <i className="material-icons">call_end</i>
        </button>
      </div>
    </div>
  )
}

export default Ringing
