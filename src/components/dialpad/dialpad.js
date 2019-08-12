import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Context } from '../../context/context'
import { MUTATION_MAKECALL } from '../../graphql/mutations'
import DialpadKeys from './dialpadKeys'
import DialpadControls from './dialpadControls'
import './dialpad.scss'

const Dialpad = () => {
  const { authorized, setAuthorized } = useContext(Context)
  // TODO: remove strings from number
  const [dialNumber, setDialNumber] = useState('') // local state for dialpad number

  const [makeCallMutation, { error }] = useMutation(MUTATION_MAKECALL)
  const handleMakeCall = () => {
    makeCallMutation({
      variables: { number: dialNumber }
    })
  }
  if (error && authorized) {
    setAuthorized(false)
    localStorage.removeItem('anvilToken')
  }
  return (
    <div className="pbx-remote__dialpad-wrapper">
      <input
        className="pbx-remote__dialpad-input"
        type="text"
        value={dialNumber}
        onChange={e => setDialNumber(e.target.value)}
      />
      <DialpadKeys onDialpadKeyClick={key => setDialNumber(dialNumber + key)} />
      <DialpadControls
        dialNumber={dialNumber}
        onDialNumberChange={setDialNumber}
        onMakeCall={handleMakeCall}
      />
    </div>
  )
}

export default Dialpad
