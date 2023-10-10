function Input({ placeholder, width, id, span, handleInput, defaultValue }) {
  return (
    <div
      className={`w-[${width}] flex flex-col gap-2 ${span ? "col-span-2" : ""}`}
    >
      <label className="text-xs tracking[5%]" htmlFor={`${id}`}>
        {placeholder}
      </label>
      <input
        onChange={handleInput}
        className={`w-[100%] h-[45px] border-2 border-black pl-4`}
        placeholder={placeholder}
        id={`${id}`}
        type={`${placeholder.split(" ").at(-1)}`}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default Input;
