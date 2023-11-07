import { useState } from "react";
import Input from "../account sections/Input";
import Popup from "./Popup";

function SaveDocuent({ setIsOpen }) {
  const [title, setTitle] = useState("");

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }

  const callBackendAPI = async () => {
    const response = await fetch("/api/v1/documents/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("jwt"),
        data: document.querySelector(".editor").outerHTML,
        title: title,
      }),
    });
    const result = await response.json();

    const blob = new Blob([result.file]);
    const fileDocx = new File([blob], title + ".docx");
    const formData = new FormData();
    formData.append(title, fileDocx);

    if (response.status !== 200) {
      throw Error(result.message);
    }
  };

  return (
    <Popup width={540} height={400} handleClose={handleClose}>
      <Input
        placeholder={"Document name"}
        width={"285px"}
        handleInput={setTitle}
      />
      <fieldset className="w-[285px] flex flex-col justify-start border-2 pl-2 border-black my-4">
        <legend>Type of document</legend>
        <div>
          <input
            className="w-4 accent-black"
            name="type"
            id="type-doc"
            type="radio"
          />
          <label htmlFor="ype-doc">.doc</label>
        </div>
        <div>
          <input
            className="w-4 accent-black"
            name="type"
            id="type-pdf"
            type="radio"
          />
          <label htmlFor="ype-doc">.pdf</label>
        </div>
      </fieldset>
      <div className="w-[285px] flex justify-center items-center gap-4 mt-8">
        <input
          className="w-6 h-6 accent-black"
          type="checkbox"
          id="export-chbox"
        />
        <label htmlFor="export-chbox">Export this document</label>
      </div>
      <button
        onClick={callBackendAPI}
        className="bg-black w-[204px] h-8 mt-4 text-white text-base"
      >
        Confirm and save
      </button>
    </Popup>
  );
}

export default SaveDocuent;
