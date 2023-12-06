import { useContext, createContext, useReducer } from "react";
import * as API from "../api/documentsAPI";
import reducer from "./reducers/docmentReducer";

const DocunentsContext = createContext();

export function DocunentsProvider({ children }) {
  const [documents, dispatch] = useReducer(reducer, {
    documents: [],
  });

  function search(searchQuery) {
    dispatch({ type: "search", payload: searchQuery });
  }
  function sort(type, kind) {
    dispatch({ type: type + "-" + kind });
  }
  async function renameDocument(documentId, newName) {
    const { status, message } = await API.renameDocument(documentId, newName);
    if (status)
      dispatch({
        type: "document/renamed",
        payload: { documentId: documentId, newName: newName },
      });
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteDocument(documentId, newName) {
    const { status, message } = await API.deleteDocument(documentId, newName);
    if (status) dispatch({ type: "document/deleted", payload: document });
    return { isRecieved: true, status: status, message: message };
  }
  async function saveDocument(title) {
    const { document, status, message } = await API.saveDocument(title);
    if (status) dispatch({ type: "document/saved", payload: document });
    return { isRecieved: true, status: status, message: message };
  }
  async function getDocuments() {
    const result = await API.getDocuments();
    dispatch({ type: "documents/loaded", payload: result });
    dispatch({ type: "date-descending", payload: documents });
  }

  const value = {
    documents: documents?.documents,
    dispatch,
    saveDocument,
    renameDocument,
    deleteDocument,
    getDocuments,
    search,
    sort,
  };

  return (
    <DocunentsContext.Provider value={value}>
      {children}
    </DocunentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocunentsContext);
  return context;
}
