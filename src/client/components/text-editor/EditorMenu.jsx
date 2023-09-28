import EditorMenuButton from "./EditorMenuButton";

function EditorMenu({ editor }) {
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
  return (
    <div className="mb-8">
      {buttons.map((button) => (
        <EditorMenuButton name={button} editor={editor} key={button} />
      ))}
    </div>
  );
}

export default EditorMenu;
