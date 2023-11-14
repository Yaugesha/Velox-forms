import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { jwtDecode } from "jwt-decode";
import authStore from "../../stores/authStore";
import Popup from "./Popup";

const SignIn = observer(() => {
  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrectData, setCorrectData] = useState({
    status: false,
    messege: "",
  });

  function checkSubmitData() {
    if (!password || !email) {
      return true;
    } else return false;
  }

  const callBackendAPI = async () => {
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
      setCorrectData({
        status: true,
        messege: result.messege,
      });
      localStorage.setItem("jwt", result.jwt);
      const role = jwtDecode(result.jwt).role;
      authStore.login();
      authStore.setRole(role);
    } catch {
      setCorrectData({
        status: false,
        messege: "Incorrect user data recieved",
      });
    }
  };

  return (
    <Popup width={980} height={508} handleClose={handleClose}>
      <span className="flex justify-center items-center h-11 mb-16">
        <hr className="w-[120px] border-black" />
        <p className="text-3xl mx-5">Sign In</p>
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
        {!isCorrectData.status ? (
          <p className="w-[357px] text-red-700 font-bold -my-4 ">
            {isCorrectData.messege}
          </p>
        ) : (
          <p className="w-[357px] text-green-700 font-bold -mt-4">
            {isCorrectData.messege}
          </p>
        )}
        <button
          disabled={checkSubmitData()}
          onClick={(e) => {
            callBackendAPI();
          }}
          className="bg-black w-[120px] h-8 text-white text-base submit-btn disabled:opacity-50"
        >
          Sign in
        </button>
      </div>
      <p className="pt-14 text-base">
        New to Velox Forms?&nbsp;
        <Link to="../signUp">
          <u
            className="cursor-pointer"
            onClick={() =>
              window.history.pushState({ overflow: true }, null, null)
            }
          >
            Create an account.
          </u>
        </Link>
      </p>
    </Popup>
  );
});

export default SignIn;
