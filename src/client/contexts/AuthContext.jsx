import React, { createContext, useContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

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
  const refreshToken = async (token) => {
    try {
      const response = await fetch("/api/v1/users/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw result;
      }
      localStorage.setItem("jwt", result.jwt);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

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
    try {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
      localStorage.setItem("jwt", result.jwt);
      const { id, role } = jwtDecode(result.jwt);
      dispatch({ type: "authorize", payload: { userId: id, role: role } });
      return {
        status: true,
        message: result.message,
      };
    } catch (error) {
      return {
        status: false,
        message: "Incorrect user data recieved",
      };
    }
  }

  async function register(email, password) {
    try {
      const response = await fetch("/api/v1/users/regist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw result;
      }
      setCorrectData({
        status: true,
        messege: result.messege,
      });
      localStorage.setItem("jwt", result.jwt);
      const { id, role } = jwtDecode(result.jwt);
      dispatch({ type: "authorize", payload: { userId: id, role: role } });
    } catch (errors) {
      if (errors.errors) {
        return {
          status: false,
          messege: errors.errors[0].msg,
        };
      } else if (errors) {
        return {
          status: false,
          messege: errors.messege,
        };
      }
    }
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
