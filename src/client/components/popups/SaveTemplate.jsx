import { useState } from "react";
import Input from "../account sections/Input";
import DropdownButton from "../buttons/DropdownButton";
import Popup from "./Popup";

function SaveTemplate({ setIsOpen }) {
  const categories = ["Bank documents", "Fee documents", "Labs titulniks"];
  const [category, setCategory] = useState(categories[0]);
  const [title, setTitle] = useState("");

  const callBackendAPI = async () => {
    const response = await fetch("/api/v1/templates/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("jwt"),
        data: document.querySelector(".editor").outerHTML,
        title: title,
        category: category,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
  };

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }

  return (
    <Popup width={540} height={400} handleClose={handleClose}>
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
        onClick={callBackendAPI}
        className="bg-black w-[204px] h-8 mt-4 text-white text-base"
      >
        Confirm and save
      </button>
    </Popup>
  );
}

export default SaveTemplate;