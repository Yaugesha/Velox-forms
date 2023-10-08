import { Mark, mergeAttributes } from "@tiptap/core";

const LowerCase = Mark.create({
  name: "lowerCase",
  toDOM: () => {
    return ["span", { class: "lowercase", id: generateSafeHtmlId() }, 0];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes({ class: "lowercase" }, HTMLAttributes), 0];
  },
  parseHTML() {
    return [{ tag: "span.lowercase" }];
  },
  addCommands() {
    return {
      setLowerCase:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleLowerCase:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetLowerCase:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default LowerCase;
