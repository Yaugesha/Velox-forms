import React, { createContext, useContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken, login, regist } from "../api/authAPI";

const AuthContext = createContext();

const initialState = {
  id: "",
  isAuthorized: false,
  role: "unAuthorizedUser",
};

function reducer(state, action) {
  switch (action.type) {
    case "authorize": {
      return {
        ...state,
        id: action.payload.userId,
        role: action.payload.role,
        isAuthorized: true,
      };
    }
    case "logOut": {
      return {
        ...state,
        id: "",
        role: "unAuthorizedUser",
        isAuthorized: false,
      };
    }
  }
}

export function AuthProvider({ children }) {
  function isTokenFresh(token) {
    if (token === null) return false;
    //const decodedToken = jwtDecode(token);
    // if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
    //   console.log("Token is valid");
    //   return true
    // } else {
    //   console.error("Token has expired or is invalid");
    //   return false
    // }
    return true;
  }

  function checkIsUserAuthorized() {
    const jwt = localStorage.getItem("jwt");
    if (isTokenFresh(jwt)) {
      const { id, role } = jwtDecode(jwt);
      dispatch({ type: "authorize", payload: { userId: id, role: role } });
      return true;
    } else {
      dispatch({ type: "logOut", payload: {} });
      return false;
    }
  }

  async function authorize(email, password) {
    const { authDispatch, status, message } = await login(email, password);
    if (authDispatch)
      dispatch({ type: authDispatch.type, payload: authDispatch.payload });
    return {
      status: status,
      message: message,
    };
  }

  async function register(email, password) {
    const { authDispatch, status, message } = await regist(email, password);
    if (authDispatch)
      dispatch({ type: authDispatch.type, payload: authDispatch.payload });
    return {
      status: status,
      message: message,
    };
  }

  function logOut() {
    dispatch({ type: "logOut" });
  }

  const [{ id, role, isAuthorized }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      checkIsUserAuthorized();
    },
    [role]
  );

  const value = {
    id,
    role,
    isAuthorized,
    checkIsUserAuthorized,
    authorize,
    register,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
