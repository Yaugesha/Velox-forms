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
        class: "w-[7in] h-[9.25in] px-[16mm] py-[27mm] border-2 border-black",
      },
    },
  });

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
      {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </>
  );
}

export default Editor;
