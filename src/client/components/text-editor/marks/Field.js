import { Mark, mergeAttributes } from "@tiptap/core";

const Field = Mark.create({
  name: "field",
  toDOM: () => {
    return [
      "node-view",
      {
        class: `field ${this.options.id} bg-black text-white`,
        contenteditable: "false",
        id: generateSafeHtmlId(),
      },
      0,
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "node-view",
      mergeAttributes(
        {
          "data-type": "fieldNode",
          class: `field ${this.options.id} bg-black text-white`,
          contenteditable: "false",
        },
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
          }
          callback(text);
          this.options.id = text;
          // <node-view contenteditable="false">text</node-view>;
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
          console.log(text);
          callback(text);
          this.options.id = text;
          return commands.unsetMark(this.type, this.options);
        },
    };
  },
});

export default Field;
