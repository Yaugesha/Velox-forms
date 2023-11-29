import { useContext, useState, createContext, useEffect } from "react";
import * as API from "../api/documentsAPI";

const DocunentsContext = createContext();

export function DocunentsProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  // const [documentRequest, setDocumentRequest] = useState({
  //   isRecieved: false,
  //   status: null,
  //   message: "",
  // });
  const [searchQuery, setSearchQuery] = useState("");

  const searchDocuments =
    searchQuery.length > 0
      ? documents.filter((document) => {
          return document.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      : documents;

  async function renameDocument(documentId, newName) {
    const { status, message } = await API.renameDocument(documentId, newName);
    if (status)
      setDocuments(
        documents.map((document) => {
          if (document.id !== documentId) return document;
          else return { ...document, title: newName };
        })
      );
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteDocument(documentId, newName) {
    const { status, message } = await API.deleteDocument(documentId, newName);
    if (status)
      setDocuments([
        ...documents.filter((document) => {
          return document.id !== documentId;
        }),
      ]);
    return { isRecieved: true, status: status, message: message };
  }
  async function saveDocument(title) {
    const { document, status, message } = await API.saveDocument(title);
    if (status) setDocuments([...documents, document]);
    return { isRecieved: true, status: status, message: message };
  }
  async function getDocuments() {
    const result = await API.getDocuments();
    setDocuments([...result]);
  }

  const value = {
    documents: searchDocuments,
    setSearchQuery,
    saveDocument,
    renameDocument,
    deleteDocument,
    getDocuments,
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
