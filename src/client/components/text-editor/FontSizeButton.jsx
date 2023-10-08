import EditorDropdownButton from "./EditorDropdownButton";

const sizes = [
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
  { label: "24", value: "24" },
  { label: "30", value: "30" },
  { label: "36", value: "36" },
  { label: "48", value: "48" },
  { label: "60", value: "60" },
  { label: "72", value: "72" },
  { label: "96", value: "96" },
];

function FontSizeButton({ editor }) {
  function changeSize(size) {
    editor.chain().focus().toggleFontSize(size).run();
  }

  return (
    <EditorDropdownButton
      editor={editor}
      type={"fontSize"}
      handleClick={changeSize}
      valuesArr={sizes}
      initialValue={16}
      width={"10"}
    />
  );
}

export default FontSizeButton;
