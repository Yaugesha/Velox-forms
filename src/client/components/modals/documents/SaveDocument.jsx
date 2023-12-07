import { useState } from "react";
import Input from "../../custom-elements/Input";
import Popup from "../Popup";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../../contexts/DocumentsContext";
import ResultMessage from "../ResultMessage";

function SaveDocument({ setIsOpen }) {
  const [title, setTitle] = useState("");
  const [isCorrectData, setCorrectData] = useState({
    isRecieved: false,
    status: false,
    message: "",
  });
  const navigate = useNavigate();

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("cancel-btn")
    ) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
      navigate("../.");
    }
  }

  const { saveDocument } = useDocuments();

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "440px", height: "260px" }}
      >
        <p className="text-xl text-bold">Save document</p>
        <Input
          placeholder={"Document name"}
          width={"285px"}
          withLabel={true}
          handleInput={setTitle}
        />
        <div className="mt-2">
          <ResultMessage
            isVisible={isCorrectData.isRecieved}
            isCorrect={isCorrectData.status}
            message={isCorrectData.message}
          />
        </div>
        <div className="w-full flex justify-around">
          <button
            className="cancel-btn bg-black text-white px-4 text-base"
            onClick={handleClose}
          >
            {isCorrectData.isRecieved ? "Exit" : "Cancel"}
          </button>
          <button
            disabled={isCorrectData.isRecieved}
            onClick={async (e) => {
              setCorrectData(await saveDocument(title));
            }}
            className="save-btn w-[90px] bg-black h-8 text-white px-4 text-base"
          >
            Save
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default SaveDocument;
