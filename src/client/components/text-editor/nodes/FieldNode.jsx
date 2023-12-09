import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import React from "react";

export default (props) => {
  return (
    <NodeViewWrapper
      contentEditable={false}
      className={`bg-black text-white px-0.5 inline-block react-component index-${
        props.node.attrs.index
      } ${props.node.attrs.field ?? "field"}`}
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
