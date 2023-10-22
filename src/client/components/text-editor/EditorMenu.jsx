import React, { useContext } from "react";
import FontSizeButton from "./buttons/FontSizeButton";
import FontStyleButton from "./buttons/FontStyleButton";
import ListButtons from "./buttons/ListButtons";
import ScaleSlider from "./buttons/ScaleSlider";
import TextDecorationButtons from "./buttons/TextDecorationButtons";
import TextCaseButtons from "./buttons/TextCaseButtons";
import AlignButtons from "./buttons/AlignButtons";
import TableButtons from "./buttons/TableButtons";
import DocumentContext from "../../contexts/DocumentContext";

function EditorMenu() {
  const context = useContext(DocumentContext);

  if (!context.editor) return null;

  const handleInsertField = () => {
    let index;
    if (context.fields.find((field) => field === "field") === undefined) {
      index = context.fields.length;
      context.addField("field");
    } else index = context.fields.length - 1;
    context.editor
      .chain()
      .focus()
      .insertContent(`<field index="${index}">field</field>&nbsp;`)
      .run();
  };

  return (
    <div className="w-[793px] h-30 flex items-center justify-between flex-wrap gap-2 mb-8 py-3 px-5 border-2 border-black">
      <FontStyleButton editor={context.editor} />
      <FontSizeButton editor={context.editor} />
      <TextDecorationButtons editor={context.editor} />
      <TextCaseButtons editor={context.editor} />
      <ListButtons editor={context.editor} />
      <AlignButtons editor={context.ditor} />
      <TableButtons editor={context.editor} />
      <button
        className="inlene-block border-[1px] border-black px-1 py-[3px]"
        onClick={handleInsertField}
      >
        Add field
      </button>
      <ScaleSlider scale={context.scale} setScale={context.setScale} />
    </div>
  );
}

export default EditorMenu;
