import EditorDropdownButton from "./EditorDropdownButton";

const fonts = [
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "Calibri", value: `"PT Sans", Calibri, Tahoma, sans-serif` },
];

function FontStyleButton({ editor }) {
  function changeFontstyle(fontFamily) {
    editor.chain().focus().setFontFamily(fontFamily).run();
  }

  return (
    <EditorDropdownButton
      editor={editor}
      type={"fontStyle"}
      handleClick={changeFontstyle}
      valuesArr={fonts}
      initialValue={"Inter"}
      width={30}
    />
  );
}

export default FontStyleButton;
