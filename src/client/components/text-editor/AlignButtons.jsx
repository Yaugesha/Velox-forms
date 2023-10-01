import EditorMenuButton from "./EditorMenuButton";

function AlignButtons({ editor }) {
  const buttons = new Map([
    ["align-L", "/src/client/assets/icons/text-editor/icon-align-left.svg"],
    ["align-R", "/src/client/assets/icons/text-editor/icon-align-right.svg"],
    ["align-C", "/src/client/assets/icons/text-editor/icon-align-center.svg"],
    ["align-J", "/src/client/assets/icons/text-editor/icon-align-justify.svg"],
  ]);

  let keys = [];
  let action;
  const buttonClass =
    "flex items-center justify-center w-12 h-8 border-[1px] border-black";

  function defineButton(button) {
    switch (button) {
      case "align-L":
        action = editor.chain().focus().setTextAlign("left").run;
        break;
      case "align-R":
        action = editor.chain().focus().setTextAlign("right").run;
        break;
      case "align-C":
        action = editor.chain().focus().setTextAlign("center").run;
        break;
      case "align-J":
        action = editor.chain().focus().setTextAlign("justify").run;
        break;
    }
  }
  function getKeys() {
    buttons.forEach((val, key) => keys.push(key));
    return keys;
  }

  return (
    <div className="flex">
      {getKeys().map((button) => {
        defineButton(button);
        return (
          <EditorMenuButton
            name={button}
            editor={editor}
            handleClick={action}
            key={button}
            buttonClass={buttonClass}
            img={buttons.get(button)}
          />
        );
      })}
    </div>
  );
}

export default AlignButtons;
