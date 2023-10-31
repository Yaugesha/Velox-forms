import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import Popup from "./Popup";

const SignOut = observer(() => {
  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      navigate(-1);
    }
    if (e.target.classList.contains("submit-btn")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    authStore.logout();
    authStore;
  }

  return (
    <Popup width={760} height={340} handleClose={handleClose}>
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
          className="bg-black w-[140px] h-14 mt-4 flex items-center justify-center text-white submit-btn"
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            handleClose(e);
            handleSignOut();
          }}
          className="bg-black w-[162px] h-14 mt-4 flex items-center justify-center text-white submit-btn"
        >
          Sign Out
        </button>
      </div>
    </Popup>
  );
});

export default SignOut;
