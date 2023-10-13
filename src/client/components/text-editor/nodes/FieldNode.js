import { mergeAttributes, Node } from "@tiptap/core";
// import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import Suggestion from "@tiptap/suggestion";

const FieldNode = Node.create({
  name: "fieldNode",

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel({ node }) {
        return `${node.attrs.label ?? node.attrs.id}`;
      },
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            "data-id": attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `node-view[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "node-view",
      mergeAttributes(
        {
          "data-type": this.name,
          class: `field ${this.options.id} bg-black text-white`,
          contenteditable: "false",
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default FieldNode;
