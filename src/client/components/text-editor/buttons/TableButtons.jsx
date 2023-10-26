function TableButtons({ editor }) {
  const buttonClass =
    "flex items-center justify-center w-12 h-8 border-[1px] border-black";

  return (
    <div className="flex flex-wrap">
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-create-table.svg"
          alt="create table"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-add-column-before.svg"
          alt="add col bef"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-add-column-after.svg"
          alt="add col aft"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().deleteColumn().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-delete-column.svg"
          alt="del col"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().addRowBefore().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-add-row-before.svg"
          alt="add row bef"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-add-row-after.svg"
          alt="add row af"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().deleteRow().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-delete-row.svg"
          alt="del row"
        />
      </button>
      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className={buttonClass}
      >
        <img
          src="/src/client/assets/icons/text-editor/icon-delete-table.svg"
          alt="delete table"
        />
      </button>
      {/* <button onClick={() => editor.chain().focus().mergeCells().run()}>
        mergeCells
      </button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>
        splitCell
      </button>
      <button
        onClick={() =>
          editor.chain().focus().setCellAttribute("colspan", 2).run()
        }
      >
        setCellAttribute
      </button>
      <button onClick={() => editor.chain().focus().fixTables().run()}>
        fixTables
      </button> */}
    </div>
  );
}

export default TableButtons;
