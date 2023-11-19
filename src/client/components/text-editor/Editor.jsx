import { EditorContent, BubbleMenu } from "@tiptap/react";
import EditorMenu from "./EditorMenu";
import { useEditors } from "../../contexts/EditorContext";

function Editor({ displayMenu }) {
  const { editor } = useEditors();

  function handleClickOnPage(event) {
    if (event.target.className.includes("editor mt-[15]"))
      editor.commands.focus("end");
  }

  return (
    <div>
      <EditorMenu display={displayMenu} />
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
