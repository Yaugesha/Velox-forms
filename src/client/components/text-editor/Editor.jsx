import { EditorContent, BubbleMenu } from "@tiptap/react";
import EditorMenu from "./EditorMenu";
import { useEffect, useState } from "react";

function Editor({ editor, fields, setField, unsetField }) {
  const [scale, setScale] = useState(100);

  function handleClickOnPage(event) {
    if (event.target.className.includes("editor mt-[15]"))
      editor.commands.focus("end");
  }

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
        unsetField={unsetField}
      />
      <div className="overflow-none">
        <div
          onClick={handleClickOnPage}
          className="editor mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black"
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
}

export default Editor;
