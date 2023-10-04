import React from "react";
import FontSizeButton from "./FontSizeButton";
import FontStyleButton from "./FontStyleButton";
import ListButtons from "./ListButtons";
import ScaleSlider from "./ScaleSlider";
import MarkButtons from "./MarkButtons";
import AlignButtons from "./AlignButtons";
import TableButtons from "./TableButtons";

function EditorMenu({ editor, scale, setScale }) {
  if (!editor) return null;

  return (
    <div className="mb-8">
      <ScaleSlider scale={scale} setScale={setScale} />
      <FontSizeButton editor={editor} />
      <FontStyleButton editor={editor} />
      <ListButtons editor={editor} />
      <MarkButtons editor={editor} />
      <AlignButtons editor={editor} />
      <TableButtons editor={editor} />
      <button onClick={() => editor.chain().focus().toggleField().run()}>
        insert
      </button>
    </div>
  );
}

export default EditorMenu;
