import React from "react";
import EditorMenuButton from "./EditorMenuButton";
import { useState } from "react";
import EditorDropdownButton from "./EditorDropdownButton";

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

  const [selectedOption, setSelectedOption] = useState(12);
  return (
    <div>
      <EditorDropdownButton editor={editor} />
      <div className="mb-8">
        {buttons.map((button) => (
          <EditorMenuButton name={button} editor={editor} key={button} />
        ))}
      </div>
    </div>
  );
}

export default EditorMenu;
