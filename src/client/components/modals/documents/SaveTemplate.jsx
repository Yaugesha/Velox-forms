import { useState } from "react";
import Input from "../../custom-elements/Input";
import DropdownButton from "../../custom-elements/DropdownButton";
import Popup from "../Popup";
import { useNavigate } from "react-router-dom";
import { useEditors } from "../../../contexts/EditorContext";

function SaveTemplate({ setIsOpen }) {
  const { fields } = useEditors();
  const categories = ["Bank documents", "Fee documents", "Labs titulniks"];
  const [category, setCategory] = useState(categories[0]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const callBackendAPI = async () => {
    const jwt = localStorage.getItem("jwt");
    const fily = document.querySelector(".tiptap").innerHTML;
    const data = `<div class="document mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black">${fily}</div>`;
    const response = await fetch("/api/v1/templates/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        data: data,
        title: title,
        category: category,
        fields: fields,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    //window.location.reload();
  };

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }

  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex items-center flex-col gap-4"
        style={{ width: "540px", height: "400px" }}
      >
        <Input
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
            initialValue={categories[0]}
            width={285}
          />
        </div>
        <div className="w-[285px] flex justify-center items-center gap-4 mt-8"></div>
        <button
          onClick={() => {
            callBackendAPI();
            navigate(-1);
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
