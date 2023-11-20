import { useEffect, useState } from "react";
import ResultMessage from "../ResultMessage";
import Popup from "../Popup";

function Delete({ data, setBubbleMenu, setOpen, callback }) {
  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });

  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);

  function handleClose(e) {
    if (
      e.target.classList.contains("popup-container") ||
      e.target.classList.contains("exit-btn")
    ) {
      document.body.style.overflow = "auto";
      const bubbleMenu = document.querySelector(".container-bubble-menu");
      setResultData({
        isRecieved: false,
        status: null,
        message: "",
      });
      setOpen(false);
      setBubbleMenu(false);
      if (bubbleMenu) {
        bubbleMenu.classList.remove("hidden");
      }
    }
  }
  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex flex-col gap-4"
        style={{ width: "800px", height: "230px" }}
      >
        <p className="text-xl text-bold mb-4">
          Are you sure you want delete {data.title}?
        </p>
        <p>This file will be deleted immediatly. You can't undo this action.</p>
        <ResultMessage
          isVisible={resultData.isRecieved}
          isCorrect={resultData.status}
          message={resultData.message}
        />
        <div className=" w-full flex justify-end gap-8 mr-16 mt-6">
          <button
            className="exit-btn bg-black text-white px-2 py-0.5"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white px-3 py-0.5"
            onClick={async () => {
              setResultData(await callback(data.id));
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default Delete;
