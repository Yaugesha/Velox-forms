import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApplications } from "../contexts/ApplicationsContext";
import Input from "../components/custom-elements/Input";
import DocumentHeader from "../components/header/DocumentHeader";
import ChangeStatus from "../components/modals/applications/ChangeStatus";

const onButtonClick = () => {
  const pdfUrl = "../../../uploads";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Эоис 4-5"; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function ApplicationProcessing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { application, findApplication } = useApplications();
  const [isAccsept, setIsAccept] = useState(false);
  const [isReject, setIsReject] = useState(false);

  useEffect(function () {
    const applicatonId = searchParams.get("applicationId");
    findApplication(applicatonId);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <DocumentHeader
        width="980px"
        page="Applicaton processing"
        position="fixed"
      />
      <div className="w-[980px] pt-24">
        <div className="w-full flex justify-between items-end">
          <Input
            placeholder={"Category"}
            defaultValue={application.data?.category}
            withLabel={true}
            disabled={true}
          />
          <Input
            placeholder={"Template name"}
            defaultValue={application.data?.name}
            withLabel={true}
            disabled={true}
          />
          <button
            className="h-[45px] bg-black text-white px-2"
            onClick={onButtonClick}
          >
            Download reference document
          </button>
        </div>
        <div className="mt-4">
          <label htmlFor="user-comment">User's comment for application</label>
          <textarea
            className="w-[980px] border-black border-2 p-4 mt-2"
            defaultValue={application.data?.comment}
            name="user-comment"
            disabled
            id="user-comment"
            cols="89"
            rows="2"
          ></textarea>
        </div>
        <h3 className="text-xl mt-4">Status</h3>
        <div className="flex gap-6 mt-2">
          <p>
            Current status: <strong>{application.statuses?.at(-1).name}</strong>
          </p>
          <p>
            Date: <strong>{application.statuses?.at(-1).date}</strong>
          </p>
          <p>Comment: {application.statuses?.at(-1).comment}</p>
        </div>
        <div className="flex justify-end gap-16 mt-6">
          <button
            disabled={application.statuses?.at(-1).name === "Rejected"}
            className="bg-black text-white px-4 py-2"
            onClick={() => {
              setIsReject(true);
            }}
          >
            Reject
          </button>
          {application.statuses?.at(-1).name === "Accepted" ? (
            <button
              className="bg-black text-white px-4 py-2"
              onClick={() => {
                navigate(
                  `../../documents/template?applicationId=${application.id}&userId=${application.userId}&title=${application.data.name}&category=${application.data.category}`
                );
              }}
            >
              Create template
            </button>
          ) : (
            <button
              disabled={application.statuses?.at(-1).name === "Accepted"}
              className="bg-black text-white px-4 py-2"
              onClick={() => {
                setIsAccept(true);
              }}
            >
              Accept
            </button>
          )}
        </div>
      </div>
      {isAccsept && (
        <ChangeStatus
          placeholder={"Comment messege to status"}
          defaultComment={
            "Your application has been accepted and will be completed soon"
          }
          status={"Accepted"}
          setIsOpen={setIsAccept}
        />
      )}
      {isReject && (
        <ChangeStatus
          placeholder={"Explain why application rejected"}
          defaultComment={""}
          status={"Rejected"}
          setIsOpen={setIsReject}
        />
      )}
    </div>
  );
}

export default ApplicationProcessing;
