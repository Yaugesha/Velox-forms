import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./FieldNode.jsx";

export default Node.create({
  name: "field",

  group: "inline",

  inline: true,

  content: "text*",

  addAttributes() {
    return { index: { default: 0 }, field: { default: "field" } };
  },

  parseHTML() {
    return [{ tag: "field" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["field", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
