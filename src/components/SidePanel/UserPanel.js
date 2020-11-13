import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import firebase from "../../firebase";

import settingsIcon from "./settings-icon.svg";
import userIcon from "./user-icon.svg";
import logoutIcon from "./logout-icon.svg";

function UserPanel() {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const { currentUser, setNewAvatarPhoto } = useContext(AuthContext);
  const avatarFile = useRef(null);

  function toggleDropdown() {
    if (!displayDropdown) {
      setDisplayDropdown(true);
    } else {
      setDisplayDropdown(false);
    }
  }

  function handleSignOut() {
    // this produces a change in the state of the auth
    // the user is cleared from the app and refirected to the login page
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
      });
  }

  function handleAvatar() {
    avatarFile.current.click();
  }

  function updateAvatar(event) {
    setNewAvatarPhoto(event.target.files[0]);
  }

  return currentUser ? (
    <div className="UserPanel">
      <div className="UserPanel-image">
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
      </div>
      <div className="UserPanel-info">
        <div className="UserPanel-info__name">{currentUser.displayName}</div>
        <div onClick={toggleDropdown} className="UserPanel-info__settings">
          <img src={settingsIcon} alt="settings" />
        </div>
      </div>
      {displayDropdown ? (
        <ul id="settings-dropdown" className="UserPanel-settings-dropdown">
          <li onClick={handleAvatar} className="settings-change-avatar">
            <img className="settings-icon" src={userIcon} alt="" />
            <input
              onChange={updateAvatar}
              type="file"
              ref={avatarFile}
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
            />
            Change Avatar
          </li>
          <li onClick={handleSignOut} className="settings-signout">
            <img className="settings-icon" src={logoutIcon} alt="" />
            Sign Out
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  ) : (
    <div />
  );
}

export default UserPanel;
