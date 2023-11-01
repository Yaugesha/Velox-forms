import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react";
import { jwtDecode } from "jwt-decode";
import authStore from "../../stores/authStore";
import Popup from "./Popup";

const SignUp = observer(() => {
  const navigate = useNavigate();

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("submit-btn")
    ) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const callBackendAPI = async () => {
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

    if (response.status !== 200) {
      throw Error(result.message);
    }
    localStorage.setItem("jwt", result.jwt);
    const role = jwtDecode(result.jwt).role;
    authStore.login();
    authStore.setRole(role);
  };

  return (
    <Popup width={980} height={508} handleClose={handleClose}>
      <span className="flex justify-center items-center h-11 mb-16">
        <hr className="w-[120px] border-black" />
        <p className="text-3xl mx-5">Sign Up</p>
        <hr className="w-[120px] border-black" />
      </span>
      <div className="flex justify-center items-center flex-col gap-8">
        <input
          onInput={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="email"
        />
        <input
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="password"
        />
        <input
          onInput={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Password"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="password"
        />
        <button
          onClick={(e) => {
            if (password === confirmPassword) {
              callBackendAPI();
              handleClose(e);
            }
          }}
          className="bg-black w-[200px] h-8 mt-4 text-white text-base submit-btn"
        >
          Create Account
        </button>
      </div>
    </Popup>
  );
});

export default SignUp;
