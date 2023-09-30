function ListButtons({ editor }) {
  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="w-8 h-7 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/general/icon-unordered-list.svg"
          alt="ul"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="w-8 h-7 border-[1px] border-black"
      >
        <img
          src="/src/client/assets/icons/general/icon-ordered-list.svg"
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
