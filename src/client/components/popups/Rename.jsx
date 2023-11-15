import Popup from "./Popup";
import Input from "../account sections/Input";
import { useEffect } from "react";

function Rename({ handleInput, data, setBubbleMenu, setOpen }) {
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
        style={{ width: "430px", height: "236px" }}
      >
        <p className="text-xl text-bold">Renaming</p>
        <Input
          width={"343px"}
          placeholder={"Enter new name"}
          defaultValue={data.title}
          handleInput={handleInput}
        />
        <div className=" w-full flex justify-end gap-8 mr-16">
          <button className="bg-black text-white px-2 py-0.5">Cancel</button>
          <button className="bg-black text-white px-3 py-0.5">OK</button>
        </div>
      </div>
    </Popup>
  );
}

export default Rename;
