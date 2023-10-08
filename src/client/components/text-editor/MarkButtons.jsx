import EditorMenuButton from "./EditorMenuButton";

function MarkButtons({ editor }) {
  const buttons = ["B", "I", "U", "S", "AG", "Ag", "ag"];
  let action;
  let buttonClass;

  function defineButton(button) {
    switch (button) {
      case "B":
        action = function () {
          editor.chain().focus().toggleBold().run();
        };
        buttonClass = "font-bold w-12 h-8 border-[1px] border-black";
        break;
      case "I":
        action = function () {
          editor.chain().focus().toggleItalic().run();
        };
        buttonClass = "italic w-12 h-8 border-[1px] border-black";
        break;
      case "U":
        action = function () {
          editor.chain().focus().toggleUnderline().run();
        };
        buttonClass =
          "text-decoration-line: underline w-12 h-8 border-[1px] border-black";
        break;
      case "S":
        action = function () {
          editor.chain().focus().toggleStrike().run();
        };
        buttonClass =
          "text-decoration-line: line-through w-12 h-8 border-[1px] border-black";
        break;
      case "AG":
        action = function () {
          editor
            .chain()
            .focus()
            .unsetCapitalize()
            .unsetLowerCase()
            .toggleUpperCase()
            .run();
        };
        buttonClass = "w-12 h-8 border-[1px] border-black";
        break;
      case "Ag":
        action = function () {
          editor
            .chain()
            .focus()
            .unsetLowerCase()
            .unsetUpperCase()
            .toggleCapitalize()
            .run();
        };
        buttonClass = "w-12 h-8 border-[1px] border-black";
        break;
      case "ag":
        action = function () {
          editor
            .chain()
            .focus()
            .unsetCapitalize()
            .unsetUpperCase()
            .toggleLowerCase()
            .run();
        };
        buttonClass = "w-12 h-8 border-[1px] border-black";
        break;
    }
  }

  return (
    <>
      {buttons.map((button) => {
        defineButton(button);
        return (
          <EditorMenuButton
            name={button}
            editor={editor}
            handleClick={action}
            key={button}
            buttonClass={buttonClass}
          />
        );
      })}
    </>
  );
}

export default MarkButtons;
