import { Mark, mergeAttributes } from "@tiptap/core";

const UpperCase = Mark.create({
  name: "upperCase",
  toDOM: () => {
    return ["span", { class: "uppercase", id: generateSafeHtmlId() }, 0];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes({ class: "uppercase" }, HTMLAttributes), 0];
  },
  parseHTML() {
    return [{ tag: "span.uppercase" }];
  },
  addCommands() {
    return {
      setUpperCase:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleUpperCase:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetUpperCase:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default UpperCase;
