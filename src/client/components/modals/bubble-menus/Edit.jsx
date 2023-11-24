import { useEffect, useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import ResultMessage from "../ResultMessage";
import Popup from "../Popup";
import ApplicationForm from "../../applications/ApplicationForm";

function Edit({ data, setBubbleMenu, setOpen, callback }) {
  const { referenceFile, category, title, comment, editApplication } =
    useApplications();
  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });

  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("exit-btn")
    ) {
      document.body.style.overflow = "auto";
      const bubbleMenu = document.querySelector(".container-bubble-menu");
      setResultData({
        isRecieved: false,
        status: null,
        message: "",
      });
      setOpen(false);
      setBubbleMenu(false);
      if (bubbleMenu) {
        bubbleMenu.classList.remove("hidden");
      }
    }
  }

  return (
    <Popup handleClose={handleClose}>
      <div className="relative px-7 py-10 bg-white flex flex-col gap-4">
        <div className="w-[590px] flex flex-wrap justify-between gap-y-4">
          <ApplicationForm
            application={{
              referenceFile: data.data.fileRoute,
              category: data.data.category,
              title: data.data.name,
              comment: data.data.comment,
            }}
          />
        </div>
        <div>
          <ResultMessage
            isVisible={resultData.isRecieved}
            isCorrect={resultData.status}
            message={resultData.message}
          />
        </div>
        <button
          onClick={async () =>
            setResultData(
              await editApplication({
                referenceFile: referenceFile,
                category: category,
                title: title,
                comment: comment,
                id: data.id,
              })
            )
          }
          className="w-[590px] h-10 items-center bg-black text-white"
        >
          Edit application
        </button>
      </div>
    </Popup>
  );
}

export default Edit;
