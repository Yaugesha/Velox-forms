import React, { createContext, useContext } from "react";
import AuthStore from "../stores/authStore";

const AuthContext = createContext(AuthStore);

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={AuthStore}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
