import FillingTemplFields from "../components/document-fields/FillingTemplFields";
import Editor from "../components/text-editor/Editor";
import { useState } from "react";
import DocumentHeader from "../components/header/DocumentHeader";
import SaveTemplate from "../components/popups/SaveTemplate";
import { TemplateProvider } from "../contexts/TemplateContext";

function Template() {
  const [isPopupOpen, setPopup] = useState(false);

  return (
    <TemplateProvider>
      <DocumentHeader width="1280px" page="Document">
        <div
          className="self-center px-1 border-2 border-black cursor-pointer"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save template
        </div>
      </DocumentHeader>
      <div className="w-[1280px] flex gap-64 bg-white">
        <Editor />
        <FillingTemplFields isTemplate={true} />
      </div>
      {isPopupOpen ? <SaveTemplate setIsOpen={setPopup} /> : ""}
    </TemplateProvider>
  );
}

export default Template;
