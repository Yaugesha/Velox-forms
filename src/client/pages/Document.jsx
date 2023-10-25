import { useEditor } from "@tiptap/react";
import InputFields from "../components/document-fields/InputFields";
import Editor from "../components/text-editor/Editor";
import { useState, useEffect, useReducer } from "react";
import config from "../components/text-editor/editorConfig";
import DocumentHeader from "../components/header/DocumentHeader";
import DocumentContext from "../contexts/DocumentContext";
import SaveDocuent from "../components/popups/SaveDocuent";

function Document() {
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

  const buttons = [
    {
      image:
        "/src/client/assets/icons/text-editor/icon-template-mode-editing.svg",
      alt: "template editing",
    },
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-preview.svg",
      alt: "document view",
    },
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-editing.svg",
      alt: "document filling",
    },
  ];

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

  const initialMode = {
    showMenu: "block",
    displayInput: "block",
  };

  function changeMode(state, action) {
    switch (action.name) {
      case "template editing": {
        editor.setEditable(true);
        return {
          ...state,
          showMenu: "block",
          displayInput: "block",
        };
      }
      case "document view": {
        editor.setEditable(false);
        return {
          ...state,
          showMenu: "hidden",
          displayInput: "hidden",
        };
      }
      case "document filling": {
        editor.setEditable(false);
        return {
          ...state,
          showMenu: "hidden",
          displayInput: "block",
        };
      }
    }
  }

  const [mode, dispatch] = useReducer(changeMode, initialMode);

  return (
    <DocumentContext.Provider value={documentProps}>
      <DocumentHeader
        width="1280px"
        page="Document"
        navButtons={buttons}
        handleCLick={dispatch}
      >
        <div
          className="self-center px-1 border-2 border-black"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save document
        </div>
      </DocumentHeader>
      <div className="w-[1280px] flex gap-64 bg-white">
        <Editor displayMenu={mode.showMenu} />
        <InputFields display={mode.displayInput} />
      </div>
      {isPopupOpen ? <SaveDocuent setIsOpen={setPopup} /> : ""}
    </DocumentContext.Provider>
  );
}

export default Document;
