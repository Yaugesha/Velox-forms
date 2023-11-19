import { useEffect, useState, createContext, useContext } from "react";
import { useEditor } from "@tiptap/react";
import config from "../components/text-editor/editorConfig";

const EditorContext = createContext();

function EditorProvider({ children }) {
  const editor = useEditor(config(removeField));

  const [fields, setFields] = useState([]);
  const [scale, setScale] = useState(100);

  useEffect(
    function () {
      document.querySelector(".editor").style.transform = `scale(${
        scale / 100
      })`;
      document.querySelector(".editor").style.position = "relative";
      document.querySelector(".editor").style.top = `${
        (scale / 100 - 1) * 140 * 4
      }px`;
    },
    [scale]
  );

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  const templateProps = {
    editor,
    fields,
    addField,
    removeField,
    setFields,
    setScale,
  };

  return (
    <EditorContext.Provider value={templateProps}>
      {children}
    </EditorContext.Provider>
  );
}

function useEditors() {
  const context = useContext(EditorContext);
  return context;
}

export { EditorProvider, useEditors };
