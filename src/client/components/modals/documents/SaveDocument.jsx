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
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
      navigate(-1);
    }
  }

  const { saveDocument } = useDocuments();

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "540px", height: "260px" }}
      >
        <Input
          placeholder={"Document name"}
          width={"285px"}
          handleInput={setTitle}
        />
        <ResultMessage
          isVisible={isCorrectData.isRecieved}
          isCorrect={isCorrectData.status}
          message={isCorrectData.message}
        />
        <button
          onClick={async () => {
            setCorrectData(await saveDocument(title));
          }}
          className="bg-black w-[204px] h-8 mt-4 text-white text-base"
        >
          Confirm and save
        </button>
      </div>
    </Popup>
  );
}

export default SaveDocument;
