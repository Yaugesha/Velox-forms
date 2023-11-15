import Popup from "./Popup";
import { useEffect } from "react";

function Delete({ data, setBubbleMenu, setOpen }) {
  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      const bubbleMenu = document.querySelector(".container-bubble-menu");
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

        <div className=" w-full flex justify-end gap-8 mr-16 mt-6">
          <button className="bg-black text-white px-2 py-0.5">Cancel</button>
          <button className="bg-black text-white px-3 py-0.5">DELETE</button>
        </div>
      </div>
    </Popup>
  );
}

export default Delete;
