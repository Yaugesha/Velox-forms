import { useEditor } from "@tiptap/react";
import InputFields from "../components/document-fields/InputFields";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../components/text-editor/editorConfig";

function Document() {
  const [fields, setFields] = useState([]);

  const navigate = useNavigate();

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  const editor = useEditor(config);

  return (
    <>
      <header className="w-[1280px] flex mb-4 border-b-2 bg-white border-solid border-black">
        <div className="flex items-center text-base leading-6 ">
          <div
            onClick={() => navigate(-1)}
            className="inline-block items-center w-12 cursor-pointer mr-5 ml-3 p-3 font-bold leading-7 text-2xl text-black font-serif"
          >
            &larr;
          </div>
          <span className="mr-2 pt-2">Document</span>
        </div>
        <div className="flex self-center  w-30 h-8 gap-2">
          <div className="flex self-center cursor-pointer">
            <img
              src="/src/client/assets/icons/text-editor/icon-template-mode-editing.svg"
              alt="editing-mode"
            />
          </div>
          <div className="flex self-center cursor-pointer">
            <img
              src="/src/client/assets/icons/text-editor/icon-document-mode-preview.svg"
              alt="editing-mode"
            />
          </div>
          <div className="flex self-center cursor-pointer">
            <img
              src="/src/client/assets/icons/text-editor/icon-document-mode-editing.svg"
              alt="editing-mode"
            />
          </div>
        </div>
      </header>
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
