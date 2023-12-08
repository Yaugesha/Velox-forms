import { useState } from "react";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import Button from "../../custom-elements/Button";
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
      <div className=" w-full flex justify-end gap-8 mr-16 mt-2">
        <Button
          clas={"exit-btn"}
          name={resultData.isRecieved ? "Exit" : "Cancel"}
        />
        <Button
          disabled={resultData.isRecieved}
          name={"DELETE"}
          callback={async () => {
            setResultData(await callback(bubbleMenu.data));
          }}
        />
      </div>
    </div>
  );
}

export default Delete;
