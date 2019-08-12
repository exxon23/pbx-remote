import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import DialpadKeys from '../dialpad/dialpadKeys'
import { Context } from '../../context/context'
import { MUTATION_TRANSFERCALL } from '../../graphql/mutations'

const Transfer = () => {
  const { setActivePage } = useContext(Context)
  const [transferNumber, setTransferNumber] = useState('')
  const [transferCallMutation] = useMutation(MUTATION_TRANSFERCALL)

  const handleTransfer = type => {
    transferCallMutation({
      variables: { number: transferNumber, type }
    })
  }

  const transferButtons = [
    {
      icon: 'phone_forwarded',
      label: 'Propojit s konzultací',
      action: () => handleTransfer('attended')
    },
    {
      icon: 'call_made',
      label: 'Propojit bez konzultace',
      action: () => handleTransfer('blind')
    },
    {
      icon: 'cancel',
      label: 'Návrat k hovoru',
      action: () => setActivePage('inCall')
    }
  ]

  return (
    <div className="pbx-remote__dialpad-wrapper">
      <input
        className="pbx-remote__dialpad-input"
        placeholder="Zadej číslo"
        type="text"
        value={transferNumber}
        onChange={e => setTransferNumber(e.target.value)}
      />
      <DialpadKeys onDialpadKeyClick={key => setTransferNumber(transferNumber + key)} />
      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {transferButtons.map(({ icon, label, action }) => (
          <button key={icon} className="pbx-remote__call-controls-secondary-btn" onClick={action}>
            <i className="material-icons">{icon}</i>
            <label>{label}</label>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Transfer
