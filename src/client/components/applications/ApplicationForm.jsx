import { useApplications } from "../../contexts/ApplicationsContext";
import DropdownButton from "../custom-elements/DropdownButton";
import Input from "../custom-elements/Input";

function ApplicationForm({ application }) {
  const { updateFormData } = useApplications();

  const setCategory = (category) => {
    updateFormData("category", category);
  };
  const setTitle = (title) => {
    updateFormData("category", title);
  };
  const setComment = (comment) => {
    updateFormData("category", comment);
  };

  const categories = ["Bank documents", "Fee documents", "Labs titulniks"];
  const handleFileUpload = (e) => {
    if (e.target.files) {
      updateFormData("referenceFile", e.target.files[0]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>Enter or choose template category</p>
        <DropdownButton
          type="templates-category"
          handleClick={setCategory}
          valuesArr={categories}
          initialValue={application.category}
          width={285}
        />
      </div>
      <Input
        placeholder={"Template name"}
        defaultValue={application.title}
        withLabel={true}
        width={"285px"}
        handleInput={setTitle}
      />
      <div className="w-[590px]">
        <p className="mb-2">Choose file which will be used as reference</p>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-black border-dashed cursor-pointer "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs">DOCX, PDF or TXT</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              name="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="comments">Comments</label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="w-[590px] border-black border-2 p-4 mt-2"
          placeholder="Leave comment for your application ex. fields"
          defaultValue={application.comment}
          name="comments"
          id="comments"
          cols="30"
          rows="8"
        ></textarea>
      </div>
    </>
  );
}

export default ApplicationForm;
