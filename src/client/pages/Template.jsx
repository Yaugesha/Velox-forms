import FillingTemplFields from "../components/document-fields/FillingTemplFields";
import Editor from "../components/text-editor/Editor";
import { useState } from "react";
import DocumentHeader from "../components/header/DocumentHeader";
import SaveTemplate from "../components/modals/documents/SaveTemplate";
import { EditorProvider } from "../contexts/EditorContext";
import Button from "../components/custom-elements/Button";

function Template() {
  const [isPopupOpen, setPopup] = useState(false);

  return (
    <EditorProvider>
      <DocumentHeader width="1280px" page="Document">
        <div
          className="self-center px-1 border-2 border-black cursor-pointer duration-300 hover:bg-black hover:text-white"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save template
        </div>
      </DocumentHeader>
      <div className="w-[1280px] flex justify-center gap-64 bg-white">
        <Editor />
        <FillingTemplFields isTemplate={true} />
      </div>
      {isPopupOpen ? <SaveTemplate setIsOpen={setPopup} /> : ""}
    </EditorProvider>
  );
}

export default Template;
