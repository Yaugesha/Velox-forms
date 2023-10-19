import { useEditor } from "@tiptap/react";
import Editor from "../components/text-editor/Editor";
import StarterKit from "@tiptap/starter-kit";
import InputFields from "../components/document-fields/InputFields";
import Underline from "@tiptap/extension-underline";
import UpperCase from "../components/text-editor/marks/UpperCase";
import LowerCase from "../components/text-editor/marks/LowerCase";
import CapitalizedCase from "../components/text-editor/marks/CapitalizedCase";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "../components/text-editor/marks/FontSize";
import FontFamily from "@tiptap/extension-font-family";
import Field from "../components/text-editor/nodes/Extension.js";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useState } from "react";

function Document() {
  const [fields, setFields] = useState([]);

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      UpperCase,
      CapitalizedCase,
      LowerCase,
      Field,
      FontSize,
      FontFamily,
      TextStyle,
      Table,
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: "min-w-[80px]",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "border-none focus:outline-none",
      },
    },
    onUpdate() {
      const fields = document.querySelectorAll(".react-component");
      const fieldInputs = document.querySelectorAll(".field-input");
      const isFieldForInputExist = (fields, input) => {
        for (const field of fields.entries()) {
          if (field[1].className.includes(input.id)) return true;
        }
        return false;
      };
      fieldInputs.forEach((input) => {
        if (!isFieldForInputExist(fields, input)) {
          const inputElement = input.parentElement;
          inputElement.removeChild(input);
          inputElement.removeChild(inputElement.firstChild);
          removeField(input.id);
        }
      });
    },
  });

  return (
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
  );
}

export default Document;
