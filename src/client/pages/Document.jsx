import { useEditor } from "@tiptap/react";
import InputFields from "../components/document-fields/InputFields";
import Editor from "../components/text-editor/Editor";
import { useState } from "react";
import config from "../components/text-editor/editorConfig";
import DocumentHeader from "../components/header/DocumentHeader";

function Document() {
  const [fields, setFields] = useState([]);

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

  const editor = useEditor(config);

  return (
    <>
      <DocumentHeader width="1280px" page="Document" navButtons={buttons} />
      <div className="w-[1280px] flex gap-64 bg-white">
        <Editor
          editor={editor}
          fields={fields}
          setField={addField}
          unsetField={removeField}
        />
        <InputFields
          editor={editor}
          fields={fields}
          rewriteFields={setFields}
          removeField={removeField}
        />
      </div>
    </>
  );
}

export default Document;
