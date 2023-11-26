import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApplications } from "../../../contexts/ApplicationsContext";
import Popup from "../Popup";
import ResultMessage from "../ResultMessage";

function ChangeStatus({ defaultComment, placeholder, status, setIsOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [comment, setComment] = useState(defaultComment);
  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });
  const { changeStatus } = useApplications();

  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("close-btn")
    ) {
      setResultData({
        isRecieved: false,
        status: null,
        message: "",
      });
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }
  return (
    <Popup handleClose={handleClose}>
      <div
        className="relative px-7 py-10 bg-white flex flex-col gap-4"
        style={{ width: "480px", height: "304px" }}
      >
        <div>
          <p className="text-xl font-bold">Change status to: {status}</p>
          <div className="mt-4">
            <label htmlFor="admin-comment">Your comment for application</label>
            <textarea
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="w-[420px] max-h-[98px] border-black border-2 p-4 mt-2"
              defaultValue={defaultComment}
              placeholder={placeholder}
              id="admin-comment"
            />
          </div>
          <div className="mt-4">
            <ResultMessage
              isVisible={resultData.isRecieved}
              isCorrect={resultData.status}
              message={resultData.message}
            />
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button
              className="close-btn bg-black text-white px-4 py-2"
              onClick={handleClose}
            >
              Exit
            </button>
            <button
              className="bg-black text-white px-4 py-2"
              onClick={async () => {
                setResultData(
                  await changeStatus(
                    searchParams.get("applicationId"),
                    status,
                    comment
                  )
                );
              }}
            >
              {status} application
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default ChangeStatus;
