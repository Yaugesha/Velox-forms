import { Mark, mergeAttributes } from "@tiptap/core";

const FontSize = Mark.create({
  name: "fontSize",
  addOptions() {
    return {
      size: "12",
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      size: {
        default: 12,
        rendered: false,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        {
          style: `font-size: ${this.options.size}px`,
        },
        HTMLAttributes
      ),
      0,
    ];
  },
  parseHTML() {
    return [{ tag: "span.fontSize" }];
  },
  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          if (!this.options.size.includes(size)) {
            this.options.size = size;
            return commands.setMark(this.type, this.options);
          }
        },
      toggleFontSize:
        (size) =>
        ({ commands }) => {
          if (!this.options.size.includes(size)) {
            this.options.size = size;
            return commands.toggleMark(this.type, this.options);
          }
        },
    };
  },
});

export default FontSize;
