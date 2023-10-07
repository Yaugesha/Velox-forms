import { Mark, mergeAttributes } from "@tiptap/core";

const Field = Mark.create({
  name: "field",
  toDOM: () => {
    return [
      "span",
      { class:  `field ${this.options.id} bg-black text-white`, id: generateSafeHtmlId() },
      0,
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { class: `field ${this.options.id} bg-black text-white` },
        HTMLAttributes
      ),
      0,
    ];
  },
  addCommands() {
    return {
      setField:
        (text, callback) =>
        ({ commands }) => {
          callback(text);
          this.options.id = text;
          console.log(text)
          return commands.setMark(this.type, this.options);
        },
      toggleField:
        (text, callback) =>
        ({ commands }) => {
          callback(text);
          this.options.id = text;
          return commands.toggleMark(this.type, this.options);
        },
    };
  },
});

export default Field;
