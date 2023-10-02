import { useState } from "react";

function EditorDropdownButton({
  editor,
  type,
  handleClick,
  valuesArr,
  initialValue,
  width,
}) {
  const [value, setValue] = useState(initialValue);

  const inputField = `
    <input 
      style="width: 40px; height: 22px; border: 1px solid black"
       id="${type}" type="number">
    </input>
  `;

  function handleChoose(value) {
    if (!value) return;
    setValue(value.label);
    handleClick(value.value);
  }

  function handleInputValue() {
    if (type !== "fontSize") return;
    editor.setEditable(false);
    const button = document.querySelector(".group");
    document.querySelector(".group").outerHTML = inputField;
    const input = document.querySelector(`#${type}`);
    input.focus();
    input.addEventListener("blur", () => {
      handleClick(input.value);
      editor.setEditable(true);
      input.after(button);
      input.remove();
    });
  }

  return (
    <div
      className={`group relative inline-block h-8 pl-1.5 border-[1px] border-black`}
      style={{ width: `${width * 4 + 7}px` }}
    >
      <button
        onClick={handleInputValue}
        id={type}
        className={`flex items-center justify-between pr-[8px] mt-1`}
      >
        {value}
        <img
          src={"/src/client/assets/icons/general/icon-arrow-drop.svg"}
          alt="drop-down"
        />
      </button>
      <div
        className={`hidden absolute ml-[-6px] z-10 bg-white border-[1px] border-black  group-hover:flex flex-col justify-center`}
        style={{ width: `${width * 4 + 6}px` }}
      >
        {valuesArr.map((value) => (
          <button
            onClick={() => handleChoose(value)}
            className={`block w-${width}  hover:bg-black hover:text-white`}
            key={value.value}
            style={{ fontFamily: value.value }}
          >
            {value.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EditorDropdownButton;
