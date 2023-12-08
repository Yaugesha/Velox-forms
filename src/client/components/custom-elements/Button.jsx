function Button({ name, clas, callback, disabled, notPrimary }) {
  return (
    <button
      className={`${clas} ${
        notPrimary && "border-gray-300 hover:border-black"
      } px-4 py-1.5 border-2 transition duration-500 border-black enabled:hover:bg-black enabled:hover:text-white disabled:opacity-40`}
      disabled={disabled}
      onClick={callback}
    >
      {name}
    </button>
  );
}

export default Button;
