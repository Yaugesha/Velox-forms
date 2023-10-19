import React from "react";
import FontSizeButton from "./FontSizeButton";
import FontStyleButton from "./FontStyleButton";
import ListButtons from "./ListButtons";
import ScaleSlider from "./ScaleSlider";
import TextDecorationButtons from "./TextDecorationButtons";
import TextCaseButtons from "./TextCaseButtons";
import AlignButtons from "./AlignButtons";
import TableButtons from "./TableButtons";

function EditorMenu({ editor, scale, setScale, fields, setField, unsetField }) {
  if (!editor) return null;

  const handleInsertField = () => {
    if (fields.find((field) => field === "field") === undefined)
      setField("field");
    editor.chain().focus().insertContent("<field>field</field>&nbsp;").run();
  };

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
        className="inlene-block border-[1px] border-black px-1 py-[3px]"
        onClick={handleInsertField}
      >
        Add field
      </button>
      <ScaleSlider scale={scale} setScale={setScale} />
    </div>
  );
}

export default EditorMenu;
