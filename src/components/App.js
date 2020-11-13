import React from "react";
import "./App.css";

import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Messages from './Messages/Messages'
import MetaPanel from './MetaPanel/MetaPanel'

function App() {
  return (
    <div className="App">
      <div className="side-container">
        <ColorPanel />
        <SidePanel />
      </div>
      <Messages />
      <MetaPanel />
    </div>
  );
}

export default App