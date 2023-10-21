import EditorMenuButton from "./EditorMenuButton";

function TextCaseButtons({ editor }) {
  const className = "w-12 h-8 border-[1px] border-black";
  const buttons = [
    {
      text: "AG",
      handler: () => {
        editor
          .chain()
          .focus()
          .unsetCapitalize()
          .unsetLowerCase()
          .toggleUpperCase()
          .run();
      },
    },
    {
      text: "Ag",
      handler: () => {
        editor
          .chain()
          .focus()
          .unsetLowerCase()
          .unsetUpperCase()
          .toggleCapitalize()
          .run();
      },
    },
    {
      text: "ag",
      handler: () => {
        editor
          .chain()
          .focus()
          .unsetCapitalize()
          .unsetUpperCase()
          .toggleLowerCase()
          .run();
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
            buttonClass={className}
          />
        );
      })}
    </div>
  );
}

export default TextCaseButtons;
