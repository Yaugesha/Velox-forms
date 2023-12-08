import { useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import ResultMessage from "../ResultMessage";
import ApplicationForm from "../../applications/ApplicationForm";

function Edit() {
  const { formData, editApplication } = useApplications();
  const { bubbleMenu } = useBubbleMenu();

  const [resultData, setResultData] = useState({
    isRecieved: false,
    status: "",
    message: "",
  });

  return (
    <div className="relative p-6 bg-white flex flex-col gap-4">
      <div className="w-[590px] flex flex-wrap justify-between gap-y-4">
        <ApplicationForm
          application={{
            referenceFile: bubbleMenu.data.data.fileRoute,
            category: bubbleMenu.data.data.category,
            name: bubbleMenu.data.data.name,
            comment: bubbleMenu.data.data.comment,
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
        disabled={
          !formData.category ||
          !formData.name ||
          !formData.referenceFile ||
          !formData.comment
        }
        onClick={async () =>
          setResultData(await editApplication(bubbleMenu.data.id))
        }
        className="w-[590px] h-10 items-center bg-black text-white disabled:opacity-50"
      >
        Edit application
      </button>
    </div>
  );
}

export default Edit;
