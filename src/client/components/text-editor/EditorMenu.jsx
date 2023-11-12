import FontSizeButton from "./buttons/FontSizeButton";
import FontStyleButton from "./buttons/FontStyleButton";
import ListButtons from "./buttons/ListButtons";
import ScaleSlider from "./buttons/ScaleSlider";
import TextDecorationButtons from "./buttons/TextDecorationButtons";
import TextCaseButtons from "./buttons/TextCaseButtons";
import AlignButtons from "./buttons/AlignButtons";
import TableButtons from "./buttons/TableButtons";
import { useTemplate } from "../../contexts/TemplateContext";
import HistoryButtons from "./buttons/HistoryButtons";

function EditorMenu({ display }) {
  const { editor, fields, addField, scale, setScale } = useTemplate();

  if (!editor) return null;

  const handleInsertField = () => {
    let index;
    if (fields.find((field) => field === "field") === undefined) {
      index = fields.length;
      addField("field");
    } else index = fields.length - 1;
    editor
      .chain()
      .focus()
      .insertContent(`<field index="${index}">field</field>&nbsp;`)
      .run();
  };

  return (
    <div
      className={`w-[793px] h-30 flex items-center justify-between
      flex-wrap gap-2 mb-8 py-3 px-5 border-2 border-black ${display}`}
    >
      <FontStyleButton editor={editor} />
      <FontSizeButton editor={editor} />
      <TextDecorationButtons editor={editor} />
      <TextCaseButtons editor={editor} />
      <ListButtons editor={editor} />
      <AlignButtons editor={editor} />
      <TableButtons editor={editor} />
      <button
        className="inlene-block border-[1px] border-black px-1 py-[3px]"
        onClick={handleInsertField}
      >
        Add field
      </button>
      <HistoryButtons editor={editor} />
      <ScaleSlider scale={scale} setScale={setScale} />
    </div>
  );
}

export default EditorMenu;
