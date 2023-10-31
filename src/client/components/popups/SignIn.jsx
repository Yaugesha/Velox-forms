import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useState } from "react";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

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

  const callBackendAPI = async () => {
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

    if (response.status !== 200) {
      throw Error(result.message);
    }
    localStorage.setItem("jwt", result.jwt);
    authStore.login();
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
        <button
          type="submit"
          onClick={() => {
            callBackendAPI();
          }}
          className="bg-black w-[120px] h-8 text-white text-base"
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
