import Popup from "./Popup";
import { useEffect, useState } from "react";

function Delete({ data, setBubbleMenu, setOpen }) {
  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);
  const [result, setResult] = useState({
    status: false,
    message: "",
  });

  // async function deleteTemplate(templateId) {
  //   try {
  //     const token = localStorage.getItem("jwt");
  //     const response = await fetch("/api/v1/templates/delete", {
  //       method: "DELETE",
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
  //     setResult({
  //       status: true,
  //       message: result.message,
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
        style={{ width: "800px", height: "230px" }}
      >
        <p className="text-xl text-bold mb-4">
          Are you sure you want delete {data.title}?
        </p>
        <p>This file will be deleted immediatly. You can't undo this action.</p>
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

        <div className=" w-full flex justify-end gap-8 mr-16 mt-6">
          <button className="bg-black text-white px-2 py-0.5">Cancel</button>
          <button
            className="bg-black text-white px-3 py-0.5"
            onClick={() => {
              deleteTemplate(data.id, data.title);
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default Delete;
