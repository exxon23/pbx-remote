import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'

import { MUTATION_MAKECALL } from '../../graphql/mutations'
import DialpadKeys from './dialpadKeys'
import DialpadControls from './dialpadControls'
import './dialpad.scss'

const Dialpad = () => {
  // TODO: remove strings from number
  const [dialNumber, setDialNumber] = useState('') // local state for dialpad number

  const makeCallMutation = useMutation(MUTATION_MAKECALL)

  const handleMakeCall = () => {
    makeCallMutation({
      variables: { number: dialNumber }
    })
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
        onDialNumberChange={setDialNumber}
        onMakeCall={handleMakeCall}
      />
    </div>
  )
}

export default Dialpad
