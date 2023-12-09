import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Popup from "../Popup";

function DeleteAccount({ setIsOpen }) {
  const { deleteUsser } = useAuth();
  const navigate = useNavigate();

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("cancel-btn")
    ) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
    if (e.target.classList.contains("exit-btn")) {
      document.body.style.overflow = "auto";
      navigate("/");
    }
  }

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "760px", height: "336px" }}
      >
        <div className="flex flex-col">
          <span className="text-3xl">
            Are you sure you want to delete your account?
          </span>
          <span className="text-sm mb-[60px]">
            Once you delete your account, there is no going back. Please be
            certain.
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
            onClick={async (e) => {
              await deleteUsser();
              handleClose(e);
            }}
            className="bg-black w-[162px] h-14 mt-4 flex items-center justify-center text-white exit-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default DeleteAccount;
