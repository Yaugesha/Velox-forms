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

  async function renameDocument(templateId, newName) {
    const { status, message } = await API.renameDocument(templateId, newName);
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteDocument(templateId, newName) {
    const { status, message } = await API.deleteDocument(templateId, newName);
    return { isRecieved: true, status: status, message: message };
  }
  async function getDocuments() {
    const result = await API.getDocuments();
    setDocuments([...result]);
  }

  const value = {
    documents: searchDocuments,
    setSearchQuery,
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
