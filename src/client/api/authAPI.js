import { jwtDecode } from "jwt-decode";

const contentType = "application/json;charset=utf-8";

export const refreshToken = async (token) => {
  try {
    const response = await fetch("/api/v1/users/refresh-token", {
      method: "POST",
      headers: {
        Bearer: token,
      },
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw result;
    }
    if (response.status === 200) {
      localStorage.setItem("jwt", result.jwt);
      return true;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
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
    return {
      authDispatch: {
        type: "authorize",
        payload: { userId: id, role: role },
      },
      status: true,
      message: result.message,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Incorrect user data recieved",
    };
  }
};

export const regist = async (email, password) => {
  try {
    const response = await fetch("/api/v1/users/regist", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
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
    return {
      authDispatch: {
        type: "authorize",
        payload: { userId: id, role: role },
      },
      status: true,
      message: result.message,
    };
  } catch (errors) {
    if (errors.errors) {
      return {
        status: false,
        message: errors.errors[0].msg,
      };
    } else if (errors) {
      return {
        status: false,
        message: errors.message,
      };
    }
  }
};

export const deleteUser = async () => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/users/delete", {
      method: "DELETE",
      headers: {
        Bearer: token,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw result;
    }
    localStorage.removeItem("jwt");
  } catch (errors) {
    console.log(errors);
  }
};
