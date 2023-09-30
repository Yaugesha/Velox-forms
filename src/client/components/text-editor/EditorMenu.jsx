import React from "react";
import EditorMenuButton from "./EditorMenuButton";
import FontSizeButton from "./FontSizeButton";
import FontStyleButton from "./FontStyleButton";
import ListButtons from "./ListButtons";

const buttons = [
  "B",
  "I",
  "U",
  "S",
  "AG",
  "Ag",
  "ag",
  "align-L",
  "align-R",
  "align-C",
  "align-J",
];

function EditorMenu({ editor }) {
  if (!editor) return null;

  return (
    <div>
      <FontSizeButton editor={editor} />
      <FontStyleButton editor={editor} />
      <ListButtons editor={editor} />
      <div className="mb-8">
        {buttons.map((button) => (
          <EditorMenuButton name={button} editor={editor} key={button} />
        ))}
      </div>
    </div>
  );
}

export default EditorMenu;
