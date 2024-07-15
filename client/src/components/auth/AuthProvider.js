import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null); // Assuming user data
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};
