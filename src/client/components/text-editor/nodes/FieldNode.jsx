import { NodeViewWrapper, NodeViewContent  } from "@tiptap/react";
import React from "react";

export default props => {
  return (
    <NodeViewWrapper
      contentEditable={false}
      className={`bg-black text-white inline-block px-0.5 react-component index-${props.node.attrs.index} field`}
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
}
