import React, { useState } from "react";
import { AuthContext } from "./AuthContextInstance";
import AuthService from "../services/AuthService";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isUserLoggedIn());

  const login = async (usernameOrEmail, password) => {
    const data = await AuthService.login(usernameOrEmail, password);
    setIsLoggedIn(true);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
