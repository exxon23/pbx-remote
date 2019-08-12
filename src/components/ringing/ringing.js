import React, { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { MUTATION_REJECTCALL, MUTATION_ANSWERCALL } from '../../graphql/mutations'
import { Context } from '../../context/context'
import './ringing.scss'

const Ringing = () => {
  const {
    activeCall: { number },
    setAuthorized
  } = useContext(Context)

  const [answerCallMutation, { answerCallError }] = useMutation(MUTATION_ANSWERCALL)
  const [rejectCallMutation, { rejectCallError }] = useMutation(MUTATION_REJECTCALL)
  if (answerCallError || rejectCallError) {
    setAuthorized(false)
    localStorage.removeItem('anvilToken')
  }
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
