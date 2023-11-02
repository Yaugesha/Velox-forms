function Input({
  placeholder,
  width,
  id,
  span,
  handleInput,
  defaultValue,
  typeClass,
  buttonHandler,
}) {
  return (
    <div
      className={`w-[${width}] flex flex-col gap-2 ${span ? "col-span-2" : ""}`}
    >
      <div className={`${id}_label`}>
        <label className="text-xs tracking[5%]" htmlFor={`${id}`}>
          {placeholder}
        </label>
        {buttonHandler !== undefined ? (
          <button
            className="ml-4 px-2 border-[1px] border-black"
            onClick={() => buttonHandler(id)}
          >
            insert
          </button>
        ) : (
          ""
        )}
      </div>
      <input
        onChange={(e) => {
          handleInput(e.target.value);
        }}
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
