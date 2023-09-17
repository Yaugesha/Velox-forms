import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  function handleClose(e) {
    if (e.target.classList.contains("fixed")) {
      document.body.style.overflow = "auto";
      navigate(-1);
    }
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      onClick={(e) => handleClose(e)}
      className="fixed top-0 left-0 right-0 z-2 w-full h-full flex items-center bg-[#414141] bg-opacity-60"
    >
      <div class="relative w-full flex justify-center">
        <div class="relative w-[760px] h-[340px] pt-[22px] pb-[64px] bg-white flex items-center flex-col">
          <div className="flex flex-col">
            <span className="text-3xl">Are you sure you want to sign out?</span>
            <span className="text-sm mb-[98px]">
              You will be asked to verify your identity next time you sign in.
            </span>
          </div>
          <div className="flex gap-[286px]">
            <button className="bg-black w-[140px] h-14 mt-4 flex items-center justify-center text-white">
              Cancel
            </button>
            <button className="bg-black w-[162px] h-14 mt-4 flex items-center justify-center text-white">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignOut;
