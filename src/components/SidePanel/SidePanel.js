import React from 'react'
import UserPanel from './UserPanel'
import Channels from './Channels'
import chatIcon from '../chat-icon.svg';

import './SidePanel.css';

function SidePanel() {
  return (
    <div className="SidePanel">
      <h1 className="SidePanel-title">
        <span className="title__icon"><img src={chatIcon} alr="" /></span> Chat App
      </h1>
      <UserPanel />
      <Channels />
    </div>
  )
}

export default SidePanel