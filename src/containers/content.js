import React, { useContext } from 'react'

import { Call, Home, Dialpad, Ringing } from '../components'
import { Context } from '../context/context'
import './content.scss'

const Content = () => {
  const { activePage, authorized } = useContext(Context)
  return (
    <>
      <div className="pbx-remote__content-notification">
        <span
          className="pbx-remote__content-status"
          style={{ backgroundColor: authorized ? '#AFBF27' : 'red' }}
        />
      </div>
      <div className="pbx-remote__content-wrapper">
        {activePage === 'home' && <Home />}
        {activePage === 'phone' && <Dialpad />}
        {activePage === 'inCall' && <Call />}
        {activePage === 'ringing' && <Ringing />}
      </div>
    </>
  )
}

export default Content
