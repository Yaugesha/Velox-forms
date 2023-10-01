function ListButtons({ editor }) {
  return (
    <div className="flex">
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="flex justify-center w-12 h-8 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-unordered-list.svg"
          alt="ul"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="flex justify-center w-12 h-8 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-ordered-list.svg"
          alt="ol"
        />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().splitListItem("listItem").run()}
        disabled={!editor.can().splitListItem("listItem")}
      >
        splitListItem
      </button>
      <button
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem")}
      >
        sinkListItem
      </button>
      <button
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem")}
      >
        liftListItem
      </button> */}
    </div>
  );
}
export default ListButtons;
