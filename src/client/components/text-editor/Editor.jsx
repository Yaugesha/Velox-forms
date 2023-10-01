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
import TextStyle from "@tiptap/extension-text-style";
import { useEffect, useState } from "react";

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      UpperCase,
      CapitalizedCase,
      LowerCase,
      FontSize,
      FontFamily,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "border-none outline-none",
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
    <>
      <EditorMenu editor={editor} scale={scale} setScale={setScale} />
      <div className="overflow-none">
        <div className="editor mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </>
  );
}

export default Editor;
