import { EditorContent, BubbleMenu } from "@tiptap/react";
import EditorMenu from "./EditorMenu";
import { useContext } from "react";
import DocumentContext from "../../contexts/DocumentContext";

function Editor({ displayMenu }) {
  const context = useContext(DocumentContext);

  function handleClickOnPage(event) {
    if (event.target.className.includes("editor mt-[15]"))
      context.editor.commands.focus("end");
  }

  return (
    <div>
      <EditorMenu display={displayMenu} />
      <div className="overflow-none">
        <div
          onClick={handleClickOnPage}
          className="editor mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black"
        >
          <EditorContent editor={context.editor} />
        </div>
      </div>

      <BubbleMenu editor={context.editor}>This is the bubble menu</BubbleMenu>
    </div>
  );
}

export default Editor;
