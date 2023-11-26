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
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
      navigate(-1);
    }
  }

  const { saveTemplate } = useTemplate();

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "540px", height: "400px" }}
      >
        <Input
          defaultValue={title}
          placeholder={"Template name"}
          handleInput={setTitle}
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
        <div>
          <ResultMessage
            isVisible={isCorrectData.isRecieved}
            isCorrect={isCorrectData.status}
            message={isCorrectData.message}
          />
        </div>
        <div className="w-[285px] flex justify-center items-center gap-4 mt-8"></div>
        <button
          onClick={async () => {
            const userId = searchParams.get("userId");
            const applicationId = searchParams.get("applicationId");
            setCorrectData(await saveTemplate(title, category, fields, userId));
            changeStatus(
              applicationId,
              "Complited",
              "Your application complited"
            );
          }}
          className="bg-black w-[204px] h-8 mt-4 text-white text-base"
        >
          Confirm and save
        </button>
      </div>
    </Popup>
  );
}

export default SaveTemplate;
