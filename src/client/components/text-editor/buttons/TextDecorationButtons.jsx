import EditorMenuButton from "./EditorMenuButton";

function TextDecorationButtons({ editor }) {
  const buttons = [
    {
      text: "B",
      class: "font-bold w-12 h-8 border-[1px] border-black",
      handler: () => {
        editor.chain().focus().toggleBold().run();
      },
    },
    {
      text: "I",
      class: "italic w-12 h-8 border-[1px] border-black",
      handler: () => {
        editor.chain().focus().toggleItalic().run();
      },
    },
    {
      text: "U",
      class:
        "text-decoration-line: underline w-12 h-8 border-[1px] border-black",
      handler: () => {
        editor.chain().focus().toggleUnderline().run();
      },
    },
    {
      text: "S",
      class:
        "text-decoration-line: line-through w-12 h-8 border-[1px] border-black",
      handler: () => {
        editor.chain().focus().toggleStrike().run();
      },
    },
  ];
  return (
    <div>
      {buttons.map((button) => {
        return (
          <EditorMenuButton
            name={button.text}
            editor={editor}
            handleClick={button.handler}
            key={button.text}
            buttonClass={button.class}
          />
        );
      })}
    </div>
  );
}

export default TextDecorationButtons;
