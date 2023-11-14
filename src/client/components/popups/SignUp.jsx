import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react";
import { jwtDecode } from "jwt-decode";
import authStore from "../../stores/authStore";
import Popup from "./Popup";

const SignUp = observer(() => {
  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      const role = jwtDecode(result.jwt).role;
      authStore.login();
      authStore.setRole(role);
    } catch (errors) {
      if (errors.errors) {
        setCorrectData({
          status: false,
          messege: errors.errors[0].msg,
        });
      } else if (errors) {
        setCorrectData({
          status: false,
          messege: errors.messege,
        });
      }
    }
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
        />{" "}
        {!isCorrectData.status ? (
          <p className="w-[357px] text-red-700 font-bold -mt-4 -mb-8">
            {isCorrectData.messege}
          </p>
        ) : (
          <p className="w-[357px] text-green-700 font-bold -mt-4 -mb-8">
            {isCorrectData.messege}
          </p>
        )}
        <button
          onClick={() => {
            if (password === confirmPassword) {
              callBackendAPI();
              console.log(isCorrectData.status);
            } else
              setCorrectData({
                status: false,
                messege: "Passwords doesn't match",
              });
          }}
          disabled={checkSubmitData()}
          className="bg-black w-[200px] h-8 mt-4 text-white text-base submit-btn disabled:opacity-50"
        >
          Create Account
        </button>
      </div>
    </Popup>
  );
});

export default SignUp;
