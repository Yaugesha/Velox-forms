import { useEffect, useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEditors } from "../../../contexts/EditorContext";
import { useTemplate } from "../../../contexts/TemplateContext";
import Button from "../../custom-elements/Button";
import DropdownButton from "../../custom-elements/DropdownButton";
import Input from "../../custom-elements/Input";
import Popup from "../Popup";
import ResultMessage from "../ResultMessage";

function SaveTemplate({ setIsOpen }) {
  const { fields } = useEditors();
  const { categories, saveTemplate, getTemplateCategories } = useTemplate();
  const { changeStatus } = useApplications();

  const [searchParams, setSearchParams] = useSearchParams();
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

  useEffect(function () {
    getTemplateCategories();
  }, []);

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

  return (
    <Popup handleClose={handleClose}>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Save template</h2>
        <Input
          defaultValue={title}
          placeholder={"Template name"}
          handleInput={setTitle}
          withLabel={true}
          width={"100%"}
        />
        <div className=" flex flex-col gap-2 mt-4">
          <p>Template group</p>
          <DropdownButton
            type="templates-category"
            handleClick={setCategory}
            valuesArr={categories}
            initialValue={category}
            width={320}
          />
        </div>
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
            disabled={isCorrectData.isRecieved}
          />
        </div>
      </div>
    </Popup>
  );
}

export default SaveTemplate;
