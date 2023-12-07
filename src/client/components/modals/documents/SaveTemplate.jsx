import { useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEditors } from "../../../contexts/EditorContext";
import { useTemplate } from "../../../contexts/TemplateContext";
import DropdownButton from "../../custom-elements/DropdownButton";
import Input from "../../custom-elements/Input";
import Popup from "../Popup";
import ResultMessage from "../ResultMessage";

function SaveTemplate({ setIsOpen }) {
  const { fields } = useEditors();
  const { changeStatus } = useApplications();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = ["Bank documents", "Fee documents", "Labs titulniks"];
  const [category, setCategory] = useState(
    searchParams.get("category") ?? categories[0]
  );
  const [title, setTitle] = useState(searchParams.get("title"));
  const navigate = useNavigate();
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
      navigate("../.");
    }
  }

  const { saveTemplate } = useTemplate();

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative py-8 bg-white flex items-center flex-col gap-4"
        style={{ width: "540px", height: "400px" }}
      >
        <p className="text-xl text-bold mb-4">Save template</p>
        <Input
          defaultValue={title}
          placeholder={"Template name"}
          handleInput={setTitle}
          withLabel={true}
          width={"285px"}
        />
        <div className=" flex flex-col gap-2 mt-4">
          <p>Template group</p>
          <DropdownButton
            type="templates-category"
            handleClick={setCategory}
            valuesArr={categories}
            initialValue={category}
            width={285}
          />
        </div>
        <div className="mt-2">
          <ResultMessage
            isVisible={isCorrectData.isRecieved}
            isCorrect={isCorrectData.status}
            message={isCorrectData.message}
          />
        </div>
        <div className="w-full flex justify-evenly mt-4">
          <button
            className="cancel-btn h-8 bg-black text-white px-4 text-base"
            onClick={handleClose}
          >
            {isCorrectData.isRecieved ? "Exit" : "Cancel"}
          </button>
          <button
            disabled={isCorrectData.isRecieved}
            onClick={async (e) => {
              const userId = searchParams.get("userId");
              const applicationId = searchParams.get("applicationId");
              setCorrectData(
                await saveTemplate(title, category, fields, userId)
              );
              if (userId && applicationId)
                changeStatus(
                  applicationId,
                  "Complited",
                  "Your application complited"
                );
              handleClose(e);
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

export default SaveTemplate;
