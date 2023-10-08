function AlignButtons({ editor }) {
  const buttonClass =
    "flex items-center justify-center w-12 h-8 border-[1px] border-black";

  return (
    <div className="flex">
      <button
        className={buttonClass}
        onClick={() => {
          editor.chain().focus().setTextAlign("left").run();
        }}
        key={"align-L"}
      >
        <img
          src={"/src/client/assets/icons/text-editor/icon-align-left.svg"}
          alt={"align-L"}
        />
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          editor.chain().focus().setTextAlign("right").run();
        }}
        key={"align-R"}
      >
        <img
          src={"/src/client/assets/icons/text-editor/icon-align-right.svg"}
          alt={"align-R"}
        />
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          editor.chain().focus().setTextAlign("center").run();
        }}
        key={"align-C"}
      >
        <img
          src={"/src/client/assets/icons/text-editor/icon-align-center.svg"}
          alt={"align-C"}
        />
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          editor.chain().focus().setTextAlign("justify").run();
        }}
        key={"align-J"}
      >
        <img
          src={"/src/client/assets/icons/text-editor/icon-align-justify.svg"}
          alt={"align-J"}
        />
      </button>
    </div>
  );
}

export default AlignButtons;
