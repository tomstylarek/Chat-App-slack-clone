import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function setUser(user) {
    setCurrentUser(user);
    setLoading(false);
  }

  function clearUser(user) {
    setCurrentUser(null);
    setLoading(false);
  }

  function setNewAvatarPhoto(avatarPhoto) {
    setCurrentUser(prevUser => {
      return {
        ...prevUser,
        photoURL: avatarPhoto
      }
    })
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, setUser, clearUser, setNewAvatarPhoto }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
