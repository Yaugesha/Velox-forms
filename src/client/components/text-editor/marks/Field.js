import { Mark, mergeAttributes } from "@tiptap/core";

const Field = Mark.create({
  name: "field",
  toDOM: () => {
    return [
      "span",
      {
        class: `field ${this.options.id} bg-black text-white`,
        id: generateSafeHtmlId(),
      },
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
          if (text.charAt(text.length - 1) === " ") {
            text = text.split(" ")[0];
            //document.querySelector(`.${text}`).innerText = text.split(" ")[0];
          }
          callback(text);
          this.options.id = text;
          // const fields = document.querySelectorAll(".field");
          // for (let field of fields) {
          //   console.log(field);
          // }

          return commands.setMark(this.type, this.options);
        },
      toggleField:
        (text, callback) =>
        ({ commands }) => {
          callback(text);
          this.options.id = text;
          return commands.toggleMark(this.type, this.options);
        },
      unsetField:
        (text, callback) =>
        ({ commands }) => {
          callback(text);
          this.options.id = text;
          return commands.unsetMark(this.type, this.options);
        },
    };
  },
});

export default Field;
