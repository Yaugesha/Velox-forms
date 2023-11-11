import { useState } from "react";
import Input from "../account sections/Input";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

function SaveDocuent({ setIsOpen }) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }

  const callBackendAPI = async () => {
    const fieldStyle = "bg-black text-white px-0.5";
    const data = document.querySelector(".document").outerHTML;
    const response = await fetch("/api/v1/documents/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("jwt"),
        data: data,
        file: data.replaceAll(fieldStyle, ""),
        title: title,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    //window.location.reload();
  };

  return (
    <Popup width={540} height={260} handleClose={handleClose}>
      <Input
        placeholder={"Document name"}
        width={"285px"}
        handleInput={setTitle}
      />
      <button
        onClick={() => {
          callBackendAPI();
          navigate(-1);
        }}
        className="bg-black w-[204px] h-8 mt-4 text-white text-base"
      >
        Confirm and save
      </button>
    </Popup>
  );
}

export default SaveDocuent;
