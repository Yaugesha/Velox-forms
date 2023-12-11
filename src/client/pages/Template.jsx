import FillingTemplFields from "../components/document-fields/FillingTemplFields";
import Editor from "../components/text-editor/Editor";
import { useState, useRef } from "react";
import DocumentHeader from "../components/header/DocumentHeader";
import SaveTemplate from "../components/modals/documents/SaveTemplate";
import { EditorProvider } from "../contexts/EditorContext";

function Template() {
  const [isPopupOpen, setPopup] = useState(false);
  const editor = useRef(0);

  return (
    <EditorProvider>
      <div className="flex flex-col items-center">
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
          <Editor editorRef={editor} />
          <FillingTemplFields isTemplate={true} />
        </div>
        {isPopupOpen ? (
          <SaveTemplate setIsOpen={setPopup} editorRef={editor} />
        ) : (
          ""
        )}
      </div>
    </EditorProvider>
  );
}

export default Template;
