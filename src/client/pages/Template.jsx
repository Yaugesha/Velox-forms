import { useEditor } from "@tiptap/react";
import InputFields from "../components/document-fields/InputFields";
import Editor from "../components/text-editor/Editor";
import { useState, useEffect, useReducer } from "react";
import config from "../components/text-editor/editorConfig";
import DocumentHeader from "../components/header/DocumentHeader";
import DocumentContext from "../contexts/DocumentContext";
import SaveTemplate from "../components/popups/SaveTemplate";

function Template() {
  const editor = useEditor(config(removeField));

  const [fields, setFields] = useState([]);
  const [scale, setScale] = useState(100);
  const [isPopupOpen, setPopup] = useState(false);

  useEffect(function () {
    document.querySelector(".editor").style.transform = `scale(${scale / 100})`;
    document.querySelector(".editor").style.position = "relative";
    document.querySelector(".editor").style.top = `${
      (scale / 100 - 1) * 140 * 4
    }px`;
  });

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  const documentProps = {
    editor,
    fields,
    addField,
    removeField,
    setFields,
    setScale,
  };

  return (
    <DocumentContext.Provider value={documentProps}>
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
        <InputFields />
      </div>
      {isPopupOpen ? <SaveTemplate setIsOpen={setPopup} /> : ""}
    </DocumentContext.Provider>
  );
}

export default Template;
