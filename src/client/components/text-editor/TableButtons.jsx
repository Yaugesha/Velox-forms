function TableButtons({ editor }) {
  return (
    <div>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        crT
      </button>
      <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
        addColumnBefore
      </button>
      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        addColumnAfter
      </button>
      <button onClick={() => editor.chain().focus().deleteColumn().run()}>
        deleteColumn
      </button>
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>
        addRowBefore
      </button>
      <button onClick={() => editor.chain().focus().addRowAfter().run()}>
        addRowAfter
      </button>
      <button onClick={() => editor.chain().focus().deleteRow().run()}>
        deleteRow
      </button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        deleteTable
      </button>
      <button onClick={() => editor.chain().focus().mergeCells().run()}>
        mergeCells
      </button>
      <button onClick={() => editor.chain().focus().splitCell().run()}>
        splitCell
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
        toggleHeaderColumn
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
        toggleHeaderRow
      </button>
      <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
        toggleHeaderCell
      </button>
      <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
        mergeOrSplit
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
      </button>
      <button onClick={() => editor.chain().focus().goToNextCell().run()}>
        goToNextCell
      </button>
      <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
        goToPreviousCell
      </button>
    </div>
  );
}

export default TableButtons;
