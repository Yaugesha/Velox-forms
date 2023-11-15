import Popup from "./Popup";
import Input from "../account sections/Input";
import { useEffect, useState } from "react";

function Rename({ data, setBubbleMenu, setOpen }) {
  const [title, setTitle] = useState(data.title);
  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);
  const [result, setResult] = useState({
    status: false,
    message: "",
  });

  // async function renameTemplate(templateId, newName) {
  //   try {
  //     const token = localStorage.getItem("jwt");
  //     const response = await fetch("/api/v1/templates/rename", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //       body: JSON.stringify({
  //         jwt: token,
  //         templateId: templateId,
  //       }),
  //     });
  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw result;
  //     }
  //     setResult({
  //       status: true,
  //       message: result.message,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     setResult({
  //       status: false,
  //       message: error.message,
  //     });
  //   }
  // }

  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      const bubbleMenu = document.querySelector(".container-bubble-menu");
      setOpen(false);
      setBubbleMenu(false);
      if (bubbleMenu) {
        bubbleMenu.classList.remove("hidden");
      }
    }
  }
  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex flex-col gap-4"
        style={{ width: "430px", height: "236px" }}
      >
        <p className="text-xl text-bold">Renaming</p>
        <Input
          width={"343px"}
          placeholder={"Enter new name"}
          defaultValue={data.title}
          handleInput={setTitle}
        />
        {!result.status ? (
          <p
            className={`w-[357px] ${
              !result.status && "hidden"
            } text-red-700 font-bold -my-4 `}
          >
            {result.message}
          </p>
        ) : (
          <p
            className={`w-[357px] ${
              !result.status && "hidden"
            } text-green-700 font-bold -my-4 `}
          >
            {result.message}
          </p>
        )}

        <div className=" w-full flex justify-end gap-8 mr-16">
          <button className="bg-black text-white px-2 py-0.5">Cancel</button>
          <button
            className="bg-black text-white px-3 py-0.5"
            onClick={() => {
              renameTemplate(data.id, title);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default Rename;
