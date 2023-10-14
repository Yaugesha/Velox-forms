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
import Field from "../components/text-editor/marks/Field";
import FieldNode from "../components/text-editor/nodes/FieldNode";
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
      FieldNode,
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
  });

  return (
    <div className="absolute top-0 w-[1280px] flex justify-between bg-white">
      <Editor
        editor={editor}
        fields={fields}
        setField={addField}
        unsetField={removeField}
      />
      <InputFields editor={editor} fields={fields} removeField={removeField} />
    </div>
  );
}

export default Document;
