import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      console.log("as");
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
        user_id: "4",
        email: email,
        password: password,
        role: "user",
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    console.log(result);
    return result;
  };

  return (
    <Popup width={980} height={508} handleClose={handleClose}>
      <span className="flex justify-center items-center h-11 mb-16">
        <hr className="w-[120px] border-black" />
        <p className="text-3xl mx-5">Sign Up</p>
        <hr className="w-[120px] border-black" />
      </span>
      <form className="flex justify-center items-center flex-col gap-8">
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
          onClick={() => {
            if (password === confirmPassword) callBackendAPI();
          }}
          className="bg-black w-[200px] h-8 mt-4 text-white text-base"
        >
          Create Account
        </button>
      </form>
    </Popup>
  );
}

export default SignUp;
