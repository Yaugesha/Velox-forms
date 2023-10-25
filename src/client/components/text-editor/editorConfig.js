import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import UpperCase from "./marks/UpperCase";
import LowerCase from "./marks/LowerCase";
import CapitalizedCase from "./marks/CapitalizedCase";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "./marks/FontSize";
import FontFamily from "@tiptap/extension-font-family";
import Field from "./nodes/Extension.js";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const config = (removeField) => {
  return {
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
  };
};

export default config;
