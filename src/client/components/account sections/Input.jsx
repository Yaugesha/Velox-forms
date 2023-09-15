function Input({ placeholder, width }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs tracking[5%]" htmlFor="#fullName">
        {placeholder}
      </label>
      <input
        className={`w-[${width}] h-[45px] border-2 border-black pl-4`}
        placeholder={placeholder}
        id="fullName"
        type="text"
      />
    </div>
  );
}

export default Input;
