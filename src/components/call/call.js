import React, { useContext } from 'react'

import { Context } from '../../context/context'
import './call.scss'

// TODO: add react hooks timer, UX for call in progress
const Call = () => {
  const {
    isCalling: { number }
  } = useContext(Context)
  return (
    <>
      <span>{number}</span>
      <p>0:03</p>
    </>
  )
}

export default Call
