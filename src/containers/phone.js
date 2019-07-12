import React, { useContext } from 'react'

import { Context } from '../context/context'
import { CallsListener } from '../components'
import Content from './content'
import ControlPanel from './controlPanel'
import Login from './login/login'

const Phone = () => {
  const { authorized } = useContext(Context)
  return authorized ? (
    <div className="pbx-remote__wrapper">
      <Content />
      <ControlPanel />
      <CallsListener />
    </div>
  ) : (
    <Login />
  )
}

export default Phone
