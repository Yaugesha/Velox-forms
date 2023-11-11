function Input({ placeholder, defaultValue, width, id, handleInput, colSpan }) {
  return (
    <div className={`w-[${width}] flex flex-col gap-2 ${colSpan}`}>
      <div className={`${id}_label`}>
        <label className="text-xs tracking[5%]" htmlFor={`${id}`}>
          {placeholder}
        </label>
      </div>
      <input
        onChange={(e) => {
          if (id) handleInput(e);
          else handleInput(e.target.value);
        }}
        className={`w-[100%] h-[45px] border-2 border-black pl-4`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={`${id}`}
        type={`${placeholder.split(" ").at(-1)}`}
      />
    </div>
  );
}

export default Input;
