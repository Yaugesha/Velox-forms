function Input({ placeholder, width, id, span }) {
  return (
    <div
      className={`w-[${width}] flex flex-col gap-2 ${span ? "col-span-2" : ""}`}
    >
      <label className="text-xs tracking[5%]" htmlFor={`#${id}`}>
        {placeholder}
      </label>
      <input
        className={`w-[100%] h-[45px] border-2 border-black pl-4`}
        placeholder={placeholder}
        id={`#${id}`}
        type={`${placeholder.split(" ").at(-1)}`}
      />
    </div>
  );
}

export default Input;
