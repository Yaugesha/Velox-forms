import { useState } from "react";
import { deleteUserByAdmin } from "../../../api/authAPI";
import Popup from "../Popup";
import Button from "../../custom-elements/Button";
import ResultMessage from "../ResultMessage";

function DeleteUser({ setIsOpen, userId, users, setUsers }) {
  const [isCorrectData, setCorrectData] = useState({
    isRecieved: false,
    status: false,
    message: "",
  });

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("cancel-btn")
    ) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
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
            Are you sure you want to delete account of {userId}?
          </span>
          <span className="text-sm mb-[60px]">
            Once you delete your account, there is no going back. Please be
            certain.
          </span>
          <div>
            <ResultMessage
              isVisible={isCorrectData.isRecieved}
              isCorrect={isCorrectData.status}
              message={isCorrectData.message}
            />
          </div>
        </div>
        <div className="w-full h-20 pt-6 flex justify-end gap-8">
          <Button
            clas={"cancel-btn"}
            callback={(e) => {
              handleClose(e);
            }}
            name={!isCorrectData.isRecieved ? "Cancel" : "Exit"}
          />
          <Button
            disabled={isCorrectData.isRecieved}
            clas={"exit-btn"}
            callback={async (e) => {
              const { status, message } = await deleteUserByAdmin(userId);
              setCorrectData({
                isRecieved: true,
                status: status,
                message: message,
              });
              setUsers([...users.filter((user) => user.id != userId)]);
            }}
            name={"Delete"}
          />
        </div>
      </div>
    </Popup>
  );
}

export default DeleteUser;
