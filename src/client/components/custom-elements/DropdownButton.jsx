import { useState } from "react";

function DropdownButton({ type, handleClick, valuesArr, initialValue, width }) {
  const [value, setValue] = useState(initialValue);

  const inputField = `
    <input 
      style="width: ${width}px; height: 45px; padding-left: 16px; border: 2px solid black; outline: none"
       id="${type}" type="text">
    </input>
  `;

  function handleChoose(value) {
    if (!value) return;
    setValue(value);
    handleClick(value);
  }

  function handleInputValue() {
    const button = document.querySelector(`.${type}`);
    document.querySelector(`.${type}`).outerHTML = inputField;
    const input = document.querySelector(`#${type}`);
    input.focus();
    input.addEventListener("blur", () => {
      handleChoose(input.value);
      input.after(button);
      input.remove();
    });
  }

  return (
    <div
      className={`group ${type} relative inline-block h-[45px] pl-1.5 border-2 border-black`}
      style={{ width: width + "px" }}
    >
      <button
        onClick={handleInputValue}
        id={type}
        className={`w-[100%] flex items-center ${
          value ? "justify-between" : "justify-end"
        } pr-[8px] mt-1`}
      >
        {value}
        <img
          className="w-8"
          src={"/src/client/assets/icons/general/icon-arrow-drop.svg"}
          alt="drop-down"
        />
      </button>
      <div
        style={{ width: width + "px" }}
        className={`hidden absolute ml-[-8px] mt-[9px] z-10 bg-white border-2 border-black  group-hover:flex flex-col justify-center`}
      >
        {valuesArr.map((value) => {
          return (
            <button
              onClick={() => handleChoose(value)}
              className={`block text-start h-8 pl-2 text-black hover:bg-black hover:text-white`}
              key={value}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DropdownButton;
