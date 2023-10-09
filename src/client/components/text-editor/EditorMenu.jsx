import React from "react";
import FontSizeButton from "./FontSizeButton";
import FontStyleButton from "./FontStyleButton";
import ListButtons from "./ListButtons";
import ScaleSlider from "./ScaleSlider";
import TextDecorationButtons from "./TextDecorationButtons";
import TextCaseButtons from "./TextCaseButtons";
import AlignButtons from "./AlignButtons";
import TableButtons from "./TableButtons";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function EditorMenu({ editor, scale, setScale, setField, unsetField }) {
  const edit = useEditor({ extensions: [StarterKit] });

  if (!editor) return null;

  return (
    <div className="w-[793px] h-30 flex items-center justify-between flex-wrap gap-2 mb-8 py-3 px-5 border-2 border-black">
      <FontStyleButton editor={editor} />
      <FontSizeButton editor={editor} />
      <TextDecorationButtons editor={editor} />
      <TextCaseButtons editor={editor} />
      <ListButtons editor={editor} />
      <AlignButtons editor={editor} />
      <TableButtons editor={editor} />
      <button
        onClick={() => {
          const text =
            editor.view.state.selection.content().content.content[0].content
              .content[0].text;
          editor.chain().focus().setField(text, setField).run();
          if (text.charAt(text.length - 1) === " ") {
            const field = document.querySelector(`.${text}`);
            field.innerText = text.split(" ")[0];
            field.insertAdjacentHTML("afterend", "<span> </span>");
          }
        }}
      >
        insert
      </button>
      <button
        onClick={() => {
          const text =
            editor.view.state.selection.content().content.content[0].content
              .content[0].text;
          editor.chain().focus().unsetField(text, unsetField).run();
        }}
      >
        delete
      </button>
      <ScaleSlider scale={scale} setScale={setScale} />
    </div>
  );
}

export default EditorMenu;
