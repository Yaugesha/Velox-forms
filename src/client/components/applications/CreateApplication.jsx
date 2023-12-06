import { useState } from "react";
import { useApplications } from "../../contexts/ApplicationsContext";
import ApplicationResult from "../modals/ApplicationResult";
import ApplicationForm from "./ApplicationForm";

function CreateApplication() {
  const [result, setResult] = useState(null);
  const { formData, saveApplication } = useApplications();

  return (
    <div className="w-[590px] flex flex-wrap justify-between gap-y-4">
      <ApplicationForm application={formData} />
      <button
        disabled={
          !formData.category ||
          !formData.name ||
          !formData.referenceFile ||
          !formData.comment
        }
        onClick={async () => {
          setResult(await saveApplication());
        }}
        className="w-[590px] h-10 items-center bg-black text-white disabled:opacity-50"
      >
        Submit application
      </button>
      {result && (
        <ApplicationResult message={result.message} setMessage={setResult} />
      )}
    </div>
  );
}

export default CreateApplication;
