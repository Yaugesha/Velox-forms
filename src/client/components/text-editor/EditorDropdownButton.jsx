import { useState } from "react";

const sizes = [
  { value: "8px", label: "8" },
  { value: "9px", label: "9" },
  { value: "10px", label: "10" },
  { value: "11px", label: "11" },
  { value: "12px", label: "12" },
  { value: "14px", label: "14" },
  { value: "16px", label: "16" },
  { value: "18px", label: "18" },
  { value: "24px", label: "24" },
  { value: "30px", label: "30" },
  { value: "36px", label: "36" },
  { value: "48px", label: "48" },
  { value: "60px", label: "60" },
  { value: "72px", label: "72" },
  { value: "96px", label: "96" },
];

function EditorDropdownButton({ editor }) {
  const [size, setSize] = useState("16");

  function handleChangeSize(size) {
    if (!size) return;
    setSize(size);
    editor.chain().focus().toggleFontSize(size).run();
  }

  function handleSetSize() {
    editor.setEditable(false);
    const button = document.querySelector(".group");
    document.querySelector(".group").outerHTML = `
      <input 
        style="width: 40px; height: 22px; border: 1px solid black; padding-left: 6px"
         id="fontSizeInput" type="number">
      </input>
    `;
    const input = document.querySelector("#fontSizeInput");
    input.focus();
    input.addEventListener("blur", () => {
      handleChangeSize(input.value);
      editor.setEditable(true);
      input.after(button);
      input.remove();
    });
  }

  return (
    <div className="group relative inline-block w-10 h-6 pl-1.5 border-[1px] border-black">
      <button
        onClick={handleSetSize}
        id="font-change"
        className="flex items-center justify-space-between"
      >
        {size}{" "}
        <img
          src={"/src/client/assets/icons/general/icon-arrow-drop.svg"}
          alt="drop-down"
        />
      </button>
      <div className="hidden absolute w-10 ml-[-6px] z-10 bg-white border-[1px] border-black  group-hover:flex flex-col justify-center">
        {sizes.map((size) => (
          <button
            onClick={() => handleChangeSize(size.label)}
            className="block hover:bg-black hover:text-white"
            key={size.value}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EditorDropdownButton;
