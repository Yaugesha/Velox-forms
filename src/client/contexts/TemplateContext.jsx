import { useEffect, useState, createContext, useContext } from "react";
import { useEditor } from "@tiptap/react";
import config from "../components/text-editor/editorConfig";

const TemplateContext = createContext();

function TemplateProvider({ children }) {
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
    <TemplateContext.Provider value={templateProps}>
      {children}
    </TemplateContext.Provider>
  );
}

function useTemplate() {
  const context = useContext(TemplateContext);
  return context;
}

export { TemplateProvider, useTemplate };
