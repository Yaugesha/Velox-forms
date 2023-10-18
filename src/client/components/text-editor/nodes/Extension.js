import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./FieldNode.jsx";

export default Node.create({
  name: "field",

  group: "inline",

  inline: true,

  content: "text*",

  atom: true,

  addAttributes() {
    return { count: { default: 0 } };
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
