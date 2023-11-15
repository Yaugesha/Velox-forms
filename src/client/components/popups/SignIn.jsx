import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Popup from "./Popup";

function SignIn() {
  const navigate = useNavigate();

  const { authorize } = useAuth();

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
    message: "",
  });

  function checkSubmitData() {
    if (!password || !email) {
      return true;
    } else return false;
  }

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex flex-col gap-4"
        style={{ width: "980px", height: "508px" }}
      >
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
              {isCorrectData.message}
            </p>
          ) : (
            <p className="w-[357px] text-green-700 font-bold -mt-4">
              {isCorrectData.message}
            </p>
          )}
          <button
            disabled={checkSubmitData()}
            onClick={async (e) => {
              const { status, message } = await authorize(email, password);
              setCorrectData({ status: status, message: message });
            }}
            className="bg-black w-[120px] h-8 text-white text-base submit-btn disabled:opacity-50"
          >
            Sign in
          </button>
        </div>
        <p
          className={`self-center ${
            isCorrectData.status === "" ? "pt-14" : "pt-6"
          } text-base`}
        >
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
      </div>
    </Popup>
  );
}

export default SignIn;
