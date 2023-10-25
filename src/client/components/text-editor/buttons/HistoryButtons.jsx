function HistoryButtons({ editor }) {
  return (
    <div className="flex">
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="flex justify-center w-12 h-8 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-undo.svg"
          alt="undu"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="flex justify-center w-12 h-8 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-do.svg"
          alt="redu"
        />
      </button>
    </div>
  );
}

export default HistoryButtons;
