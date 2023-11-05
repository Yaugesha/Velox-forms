function Input({
  placeholder,
  width,
  id,
  handleInput,
  typeClass,
  defaultValue,
  buttonHandler,
}) {
  return (
    <div className={`w-[${width}] flex flex-col gap-2 col-span-2 ${id}`}>
      <div className={`${id}_label`}>
        <label className="text-xs tracking[5%]" htmlFor={`${id}`}>
          {placeholder}
        </label>
        <button
          className="ml-4 px-2 border-[1px] border-black"
          onClick={() => buttonHandler(id)}
        >
          insert
        </button>
      </div>
      <input
        onChange={handleInput}
        className={`w-[100%] h-[45px] border-2 border-black pl-4 ${typeClass}`}
        placeholder={placeholder}
        id={`${id}`}
        type={`${placeholder.split(" ").at(-1)}`}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default Input;
