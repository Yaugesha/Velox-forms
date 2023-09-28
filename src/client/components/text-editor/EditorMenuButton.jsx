function EditorMenuButton({ name, editor }) {
  if (editor == undefined) return;
  let action;
  let buttonClass;
  switch (name) {
    case "B":
      action = editor.chain().focus().toggleBold().run;
      buttonClass = "font-bold w-8 h-6 border-[1px] border-black";
      break;
    case "I":
      action = editor.chain().focus().toggleItalic().run;
      buttonClass = "italic w-8 h-6 border-[1px] border-black";
      break;
    case "U":
      action = editor.chain().focus().toggleUnderline().run;
      buttonClass =
        "text-decoration-line: underline w-8 h-6 border-[1px] border-black";
      break;
    case "S":
      action = editor.chain().focus().toggleStrike().run;
      buttonClass =
        "text-decoration-line: line-through w-8 h-6 border-[1px] border-black";
      break;
    case "AG":
      action = editor
        .chain()
        .focus()
        .unsetCapitalize()
        .unsetLowerCase()
        .toggleUpperCase().run;
      buttonClass = "w-8 h-6 border-[1px] border-black";
      break;
    case "Ag":
      action = editor
        .chain()
        .focus()
        .unsetLowerCase()
        .unsetUpperCase()
        .toggleCapitalize().run;
      buttonClass = "w-8 h-6 border-[1px] border-black";
      break;
    case "ag":
      action = editor
        .chain()
        .focus()
        .unsetCapitalize()
        .unsetUpperCase()
        .toggleLowerCase().run;
      buttonClass = "w-8 h-6 border-[1px] border-black";
      break;
    case "align-L":
      action = editor.chain().focus().setTextAlign("left").run;
      buttonClass = "w-16 h-6 border-[1px] border-black";
      break;
    case "align-R":
      action = editor.chain().focus().setTextAlign("right").run;
      buttonClass = "w-16 h-6 border-[1px] border-black";
      break;
    case "align-C":
      action = editor.chain().focus().setTextAlign("center").run;
      buttonClass = "w-16 h-6 border-[1px] border-black";
      break;
    case "align-J":
      action = editor.chain().focus().setTextAlign("justify").run;
      buttonClass = "w-16 h-6 border-[1px] border-black";
      break;
  }
  return (
    <button className={buttonClass} onClick={action}>
      {name}
    </button>
  );
}

export default EditorMenuButton;
