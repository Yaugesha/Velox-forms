import Editor from "../components/text-editor/Editor";
import InputFields from "../components/document-fields/InputFields";
import { useState } from "react";

function Document() {
  const [fields, setFields] = useState([]);

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  return (
    <div className="absolute top-0 w-[1280px] flex justify-between bg-white">
      <Editor fields={fields} setField={addField} unsetField={removeField} />
      <InputFields fields={fields} removeField={removeField} />
    </div>
  );
}

export default Document;
