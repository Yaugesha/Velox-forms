import { useContext, createContext, useReducer } from "react";
import * as API from "../api/documentsAPI";
import reducer from "./reducers/documentReducer";

const DocunentsContext = createContext();

const initialState = {
  documents: [],
  allDocument: [],
};

export function DocunentsProvider({ children }) {
  const [{ documents, allDocuments }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function search(searchQuery) {
    dispatch({ type: "search", payload: searchQuery });
  }
  function sort(type, kind) {
    dispatch({ type: type + "-" + kind });
  }
  async function renameDocument(document, newName) {
    const { status, message } = await API.renameDocument(document.id, newName);
    if (status) {
      dispatch({
        type: "document/renamed",
        payload: { documentId: document.id, newName: newName },
      });
    }
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteDocument(document) {
    const { status, message } = await API.deleteDocument(document.id);
    if (status) dispatch({ type: "document/deleted", payload: document.id });
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
    documents,
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
