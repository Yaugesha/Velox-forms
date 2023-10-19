import { NodeViewWrapper, NodeViewContent  } from "@tiptap/react";
import React from "react";

export default function Field() {
  return (
    <NodeViewWrapper
      contentEditable={false}
      className="field bg-black text-white inline-block px-0.5 react-component"
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
}
