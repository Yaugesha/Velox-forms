import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenu from "./EditorMenu";
import Underline from "@tiptap/extension-underline";
import UpperCase from "./marks/UpperCase";
import LowerCase from "./marks/LowerCase";
import CapitalizedCase from "./marks/CapitalizedCase";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "./marks/FontSize";
import FontFamily from "@tiptap/extension-font-family";
import Field from "./marks/Field";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { useEffect, useState } from "react";

function Editor({ fields, setField }) {
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
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
  const [scale, setScale] = useState(100);

  useEffect(function () {
    document.querySelector(".editor").style.transform = `scale(${scale / 100})`;
    document.querySelector(".editor").style.position = "relative";
    document.querySelector(".editor").style.top = `${
      (scale / 100 - 1) * 140 * 4
    }px`;
  });
  return (
    <div>
      <EditorMenu
        editor={editor}
        scale={scale}
        setScale={setScale}
        fields={fields}
        setField={setField}
      />
      <div className="overflow-none">
        <div className="editor mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black">
          <EditorContent editor={editor} />
        </div>
      </div>

      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
}

export default Editor;
