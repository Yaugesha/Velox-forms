import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../../../contexts/DocumentsContext";
import Input from "../../custom-elements/Input";
import Popup from "../Popup";
import ResultMessage from "../ResultMessage";
import Button from "../../custom-elements/Button";

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
      if (isCorrectData.status) navigate("../.");
    }
  }

  const { saveDocument } = useDocuments();

  return (
    <Popup handleClose={handleClose}>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Create Document</h2>
        <Input
          placeholder={"Document name"}
          width={"100%"}
          withLabel={true}
          handleInput={setTitle}
        />
        <div className="mt-5">
          <ResultMessage
            isVisible={isCorrectData.isRecieved}
            isCorrect={isCorrectData.status}
            message={isCorrectData.message}
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button
            name={isCorrectData.isRecieved ? "Exit" : "Cancel"}
            callback={handleClose}
            notPrimary={true}
            clas={"cancel-btn"}
          />
          <Button
            name={"Save"}
            callback={async (e) => {
              setCorrectData(await saveDocument(title));
            }}
            disabled={isCorrectData.isRecieved}
          />
        </div>
      </div>
    </Popup>
  );
}

export default SaveDocument;
