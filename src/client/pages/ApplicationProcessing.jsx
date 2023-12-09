import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApplications } from "../contexts/ApplicationsContext";
import Input from "../components/custom-elements/Input";
import DocumentHeader from "../components/header/DocumentHeader";
import Footer from "../components/footers/Footer";
import ChangeStatus from "../components/modals/applications/ChangeStatus";
import Button from "../components/custom-elements/Button";

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
    <div className="w-full min-h-full flex flex-col items-center">
      <DocumentHeader
        width="980px"
        page="Applicaton processing"
        position="fixed"
      />
      <div className="w-[980px] pt-24 flex-auto">
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
          <a
            className="h-[45px] flex items-center border-2 border-black px-2 cursor-pointer duration-300 hover:bg-black hover:text-white"
            href={`../../../${application.data?.fileRoute}`}
            download
          >
            Download reference document
          </a>
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
          <Button
            disabled={application.statuses?.at(-1).name === "Rejected"}
            callback={() => {
              setIsReject(true);
            }}
            name={"Reject"}
          />
          {application.statuses?.at(-1).name === "Accepted" ? (
            <Button
              disabled={application.statuses?.at(-1).name === "Rejected"}
              callback={() => {
                navigate(
                  `../../documents/template?applicationId=${application.id}&userId=${application.userId}&title=${application.data.name}&category=${application.data.category}`
                );
              }}
              name={"Create template"}
            />
          ) : (
            <Button
              disabled={application.statuses?.at(-1).name === "Accepted"}
              callback={() => {
                setIsAccept(true);
              }}
              name={"Accept"}
            />
          )}
        </div>
      </div>
      <Footer />
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
