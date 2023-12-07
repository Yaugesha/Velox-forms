import { useState } from "react";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
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
      className="relative px-7 py-8 bg-white flex flex-col gap-5"
      style={{ width: "430px", height: "236px" }}
    >
      <p className="text-xl text-bold">Renaming</p>
      <Input
        width={"343px"}
        placeholder={"Enter new name"}
        defaultValue={bubbleMenu.data.title}
        handleInput={setTitle}
      />
      <div>
        <ResultMessage
          isVisible={resultData.isRecieved}
          isCorrect={resultData.status}
          message={resultData.message}
        />
      </div>
      <div className=" w-full flex justify-end gap-8 mr-16">
        <button className="exit-btn bg-black text-white px-2 py-0.5">
          {resultData.isRecieved ? "Exit" : "Cancel"}
        </button>
        <button
          className="bg-black text-white px-3 py-0.5"
          onClick={async () => {
            setResultData(await callback(bubbleMenu.data, title));
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Rename;
