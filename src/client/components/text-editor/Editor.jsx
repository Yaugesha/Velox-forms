import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
//import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import "./index.css";

function onError(error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={
          <ContentEditable className="w-[100%] h-8 pl-4 border-green" />
        }
        placeholder={
          <div className="text-xxl color-[#0f0]">Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}

export default Editor;
