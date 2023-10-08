function ScaleSlider({ scale, setScale }) {
  function handleChangeScale() {
    const range = document.querySelector("#scaleRange").value;
    setScale(range);
  }
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min="50"
        max="150"
        defaultValue="100"
        step="25"
        id="scaleRange"
        onInput={handleChangeScale}
        className="scaler w-30 h-1 outline-none bg-black  appearance-none"
      ></input>
      <label htmlFor="scaleRange">{scale}</label>
    </div>
  );
}

export default ScaleSlider;
