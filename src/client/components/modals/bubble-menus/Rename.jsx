import { useState } from "react";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import Button from "../../custom-elements/Button";
import Input from "../../custom-elements/Input";
import ResultMessage from "../ResultMessage";

function Rename({ callback }) {
  const { bubbleMenu } = useBubbleMenu();

  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });
  const [title, setTitle] = useState(bubbleMenu.data.title);

  return (
    <div
      className="relative p-6 pb-4 bg-white flex flex-col"
      style={{ width: "430px", height: "236px" }}
    >
      <p className="text-xl text-bold mb-3">Renaming</p>
      <p className="text-gray-600 mb-1">Enter new value:</p>
      <Input
        width={"343px"}
        placeholder={"Enter new name"}
        defaultValue={bubbleMenu.data.title}
        handleInput={setTitle}
      />
      <div className="mt-6 mb-2">
        <ResultMessage
          isVisible={resultData.isRecieved}
          isCorrect={resultData.status}
          message={resultData.message}
        />
      </div>
      <div className="w-full flex justify-end gap-8 mr-16">
        <Button
          clas={"exit-btn"}
          name={resultData.isRecieved ? "Exit" : "Cancel"}
        />
        <Button
          disabled={resultData.isRecieved}
          name={"OK"}
          callback={async () => {
            setResultData(await callback(bubbleMenu.data, title));
          }}
        />
      </div>
    </div>
  );
}

export default Rename;
