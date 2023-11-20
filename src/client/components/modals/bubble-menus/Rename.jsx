import { useEffect, useState } from "react";
import Popup from "../Popup";
import Input from "../../custom-elements/Input";
import ResultMessage from "../ResultMessage";

function Rename({ data, setBubbleMenu, setOpen, callback }) {
  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });
  const [title, setTitle] = useState(data.title);

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
      setResultData({
        isRecieved: false,
        status: null,
        message: "",
      });
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
        className="relative px-7 py-8 bg-white flex flex-col gap-5"
        style={{ width: "430px", height: "236px" }}
      >
        <p className="text-xl text-bold">Renaming</p>
        <Input
          width={"343px"}
          placeholder={"Enter new name"}
          defaultValue={data.title}
          handleInput={setTitle}
        />
        <div>
          <ResultMessage
            isVisible={resultData.isRecieved}
            isCorrect={resultData.status}
            message={resultData.message}
          />
        </div>
        <div className=" w-full flex justify-end gap-8 mr-16">
          <button className="exit-btn bg-black text-white px-2 py-0.5">
            {resultData.isRecieved ? "Exit" : "Cancel"}
          </button>
          <button
            className="bg-black text-white px-3 py-0.5"
            onClick={async () => {
              setResultData(await callback(data.id, title));
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default Rename;
