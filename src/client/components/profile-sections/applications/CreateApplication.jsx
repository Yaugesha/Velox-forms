import { useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import * as API from "../../../api/applicationsAPI";
import ApplicationResult from "../../modals/ApplicationResult";
import ApplicationForm from "./ApplicationForm";

function CreateApplication() {
  const [result, setResult] = useState(null);
  const { referenceFile, category, title, comment } = useApplications();

  return (
    <div className="w-[590px] flex flex-wrap justify-between gap-y-4">
      <ApplicationForm
        application={{ referenceFile, category, title, comment }}
      />
      <button
        onClick={async () =>
          setResult(
            await API.submitAplication(referenceFile, category, title, comment)
          )
        }
        className="w-[590px] h-10 items-center bg-black text-white"
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
