import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";

function SignIn() {
  const navigate = useNavigate();
  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  return (
    <Popup width={980} height={508} handleClose={handleClose}>
      <span className="flex justify-center items-center h-11 mb-16">
        <hr className="w-[120px] border-black" />
        <p className="text-3xl mx-5">Sign In</p>
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
        <button className="bg-black w-[120px] h-8 text-white text-base">
          Sign in
        </button>
      </form>
      <p className="pt-14 text-base">
        New to Velox Forms?
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
}

export default SignIn;
