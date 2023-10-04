import { Mark, mergeAttributes } from "@tiptap/core";

const Field = Mark.create({
  name: "field",
  toDOM: () => {
    return [
      "span",
      { class: "field bg-black text-white", id: generateSafeHtmlId() },
      0,
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes({ class: "field bg-black text-white" }, HTMLAttributes),
      0,
    ];
  },
  addCommands() {
    return {
      setField:
        (content) =>
        ({ commands }) => {
          return commands.setMark(this.type, this.options);
        },
      toggleField:
        (content) =>
        ({ commands }) => {
          return commands.toggleMark(this.type, this.options);
        },
    };
  },
});

export default Field;
