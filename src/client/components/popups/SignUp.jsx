import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

function SignUp() {
  const navigate = useNavigate();
  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      console.log("as");
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  return (
    <Popup width={980} height={508} handleClose={handleClose}>
      <span className="flex justify-center items-center h-11 mb-16">
        <hr className="w-[120px] border-black" />
        <p className="text-3xl mx-5">Sign Up</p>
        <hr className="w-[120px] border-black" />
      </span>
      <form className="flex justify-center items-center flex-col gap-8">
        <input
          placeholder="Email"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="email"
        />
        <input
          placeholder="Password"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="password"
        />
        <input
          placeholder="Password"
          className="w-[357px] h-[48px] border border-black pl-4"
          type="password"
        />
        <button className="bg-black w-[200px] h-8 mt-4 text-white text-base">
          Create Account
        </button>
      </form>
    </Popup>
  );
}

export default SignUp;
