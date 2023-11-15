import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Popup from "./Popup";

function SignOut() {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("cancel-btn")
    ) {
      document.body.style.overflow = "auto";
      navigate(-1);
    }
    if (e.target.classList.contains("exit-btn")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    logOut();
  }

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "760px", height: "340px" }}
      >
        <div className="flex flex-col">
          <span className="text-3xl">Are you sure you want to sign out?</span>
          <span className="text-sm mb-[98px]">
            You will be asked to verify your identity next time you sign in.
          </span>
        </div>
        <div className="flex gap-[286px]">
          <button
            onClick={(e) => {
              handleClose(e);
            }}
            className="bg-black w-[140px] h-14 mt-4 flex items-center justify-center text-white cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              handleClose(e);
              handleSignOut();
            }}
            className="bg-black w-[162px] h-14 mt-4 flex items-center justify-center text-white exit-btn"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default SignOut;
