import { useEffect, useState } from "react";
import ResultMessage from "../ResultMessage";
import Popup from "../Popup";
import CreateApplication from "../../profile-sections/applications/CreateApplication";

function Edit({ data, setBubbleMenu, setOpen, callback }) {
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
      e.target.classList.contains("w-full") ||
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
      <div className="relative px-7 py-10 bg-white flex flex-col gap-4">
        <CreateApplication />
      </div>
    </Popup>
  );
}

export default Edit;
