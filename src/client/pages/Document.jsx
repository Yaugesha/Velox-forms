import { useEditor } from "@tiptap/react";
import InputFields from "../components/document-fields/InputFields";
import Editor from "../components/text-editor/Editor";
import { useState, useEffect, useReducer } from "react";
import config from "../components/text-editor/editorConfig";
import DocumentHeader from "../components/header/DocumentHeader";
import DocumentContext from "../contexts/DocumentContext";

function Document() {
  const editor = useEditor(config);

  const [fields, setFields] = useState([]);
  const [scale, setScale] = useState(100);

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
    template: (
      <div className="w-[1280px] flex gap-64 bg-white">
        <Editor />
        <InputFields />
      </div>
    ),
  };

  function changeMode(state, action) {
    switch (action.name) {
      case "template editing": {
        editor.setEditable(true);
        return {
          ...state,
          template: (
            <div className="w-[1280px] flex gap-64 bg-white">
              <Editor />
              <InputFields />
            </div>
          ),
        };
      }
      case "document view": {
        editor.setEditable(false);
        return {
          ...state,
          template: (
            <div className="w-[1280px] flex justify-center bg-white">
              <Editor />
            </div>
          ),
        };
      }
      case "document filling": {
        editor.setEditable(false);
        return {
          ...state,
          template: (
            <div className="w-[1280px] flex gap-64 bg-white">
              <Editor />
              <InputFields />
            </div>
          ),
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
      />
      {mode.template}
    </DocumentContext.Provider>
  );
}

export default Document;
