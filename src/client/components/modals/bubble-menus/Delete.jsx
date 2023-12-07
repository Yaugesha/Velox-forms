import { useState } from "react";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import ResultMessage from "../ResultMessage";

function Delete({ callback }) {
  const { bubbleMenu } = useBubbleMenu();

  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });

  return (
    <div
      className="relative px-7 py-10 bg-white flex flex-col gap-4"
      style={{ width: "800px", height: "230px" }}
    >
      <p className="text-xl text-bold mb-4">
        Are you sure you want delete {bubbleMenu.data.title}?
      </p>
      <p>This file will be deleted immediatly. You can't undo this action.</p>
      <div>
        <ResultMessage
          isVisible={resultData.isRecieved}
          isCorrect={resultData.status}
          message={resultData.message}
        />
      </div>
      <div className=" w-full flex justify-end gap-8 mr-16 mt-6">
        <button className="exit-btn bg-black text-white px-4 py-0.5">
          {resultData.isRecieved ? "Exit" : "Cancel"}
        </button>
        <button
          className="bg-black text-white px-3 py-0.5"
          onClick={async () => {
            setResultData(await callback(bubbleMenu.data));
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default Delete;
