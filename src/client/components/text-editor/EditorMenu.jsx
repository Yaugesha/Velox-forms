import React from "react";
import FontSizeButton from "./FontSizeButton";
import FontStyleButton from "./FontStyleButton";
import ListButtons from "./ListButtons";
import ScaleSlider from "./ScaleSlider";
import MarkButtons from "./MarkButtons";
import AlignButtons from "./AlignButtons";
import TableButtons from "./TableButtons";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function EditorMenu({ editor, scale, setScale, fields, setField }) {
  const edit = useEditor({ extensions: [StarterKit] });

  if (!editor) return null;

  return (
    <div className="mb-8">
      <EditorContent editor={edit} />
      <ScaleSlider scale={scale} setScale={setScale} />
      <FontSizeButton editor={editor} />
      <FontStyleButton editor={editor} />
      <ListButtons editor={editor} />
      <MarkButtons editor={editor} />
      <AlignButtons editor={editor} />
      <TableButtons editor={editor} />
      <button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setField(
              editor.view.state.selection.content().content.content[0].content
                .content[0].text,
              setField
            )
            .run();
        }}
      >
        insert
      </button>
    </div>
  );
}

export default EditorMenu;
