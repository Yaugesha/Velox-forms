import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Popup from "../Popup";
import Button from "../../custom-elements/Button";

function DeleteAccount({ setIsOpen }) {
  const { deleteUser } = useAuth();
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
        <div className="w-full h-20 pt-6 flex justify-end gap-8">
          <Button
            clas={"cancel-btn"}
            callback={(e) => {
              handleClose(e);
            }}
            name={"Cancel"}
          />
          <Button
            clas={"exit-btn"}
            callback={async (e) => {
              await deleteUser();
              handleClose(e);
            }}
            name={"Delete"}
          />
        </div>
      </div>
    </Popup>
  );
}

export default DeleteAccount;
