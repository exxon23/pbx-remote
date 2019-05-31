import React, { useContext } from 'react'
import { Context } from '../context/context'
import './controlPanel.scss'

const controlButtons = [
  {
    icon: 'perm_contact_calendar',
    page: 'contacts'
  },
  {
    icon: 'dialpad',
    page: 'phone'
  },
  {
    icon: 'history',
    page: 'history'
  }
]

const ControlPanel = () => {
  const { setActivePage } = useContext(Context)
  return (
    <div className="pbx-remote__controlPanel-wrapper">
      {controlButtons.map(({ icon, page }) => (
        <button
          key={page}
          className="pbx-remote__control-panel-btn"
          onClick={() => setActivePage(page)}
        >
          <i className="material-icons">{icon}</i>
        </button>
      ))}
    </div>
  )
}

export default ControlPanel
