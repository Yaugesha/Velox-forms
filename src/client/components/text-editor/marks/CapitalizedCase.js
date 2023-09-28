import { Mark, mergeAttributes } from "@tiptap/core";

const CapitalizedCase = Mark.create({
  name: "capitalize",
  toDOM: () => {
    return ["span", { class: "capitalize", id: generateSafeHtmlId() }, 0];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes({ class: "capitalize" }, HTMLAttributes),
      0,
    ];
  },
  parseHTML() {
    return [{ tag: "span.capitalize" }];
  },
  addCommands() {
    return {
      setCapitalize:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCapitalize:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetCapitalize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default CapitalizedCase;
