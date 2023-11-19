import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Popup from "../Popup";
import ResultMessage from "../ResultMessage";

function SignUp() {
  const navigate = useNavigate();

  const { register } = useAuth();

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
    isRecieved: false,
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
          <ResultMessage
            isVisible={isCorrectData.isRecieved}
            isCorrect={isCorrectData.status}
            message={isCorrectData.message}
          />
          <button
            onClick={async () => {
              if (password === confirmPassword) {
                const { status, message } = await register(email, password);
                setCorrectData({
                  isRecieved: true,
                  status: status,
                  message: message,
                });
                console.log(isCorrectData.isRecieved, isCorrectData.message);
              } else
                setCorrectData({
                  isRecieved: true,
                  status: false,
                  message: "Passwords doesn't match",
                });
            }}
            disabled={checkSubmitData()}
            className="bg-black w-[200px] h-8 mt-4 text-white text-base submit-btn disabled:opacity-50"
          >
            Create Account
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default SignUp;
