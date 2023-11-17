import { useContext, useState, createContext, useEffect } from "react";

const DocunentsContext = createContext();

export function DocunentsProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  const [templates, setTemplates] = useState([
    {
      title: "Create new template",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
      link: "template",
    },
  ]);
  const [templateCategories, setTemplateCategories] = useState([]);
  const [request, setRequest] = useState({
    isRecieved: false,
    status: null,
    message: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const searchDocuments =
    searchQuery.length > 0
      ? documents.filter((document) => {
          return document.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      : documents;

  async function renameTemplate(templateId, newName) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/templates/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          templateId: templateId,
          title: newName,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({
        isRecieved: true,
        status: true,
        message: result.message,
      });
    } catch (error) {
      console.log(error);
      setRequest({
        status: false,
        message: error.message,
      });
    }
  }

  async function renameTemplateCategory(categoryId, newName) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/templates/category/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          categoryId: categoryId,
          name: newName,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({ isRecieved: true, status: true, message: result.message });
    } catch (error) {
      console.log(error);
      setRequest({
        status: false,
        message: error.message,
      });
    }
  }

  async function renameDocument(documentId, newName) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/documents/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          documentId: documentId,
          title: newName,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({ isRecieved: true, status: true, message: result.message });
    } catch (error) {
      console.log(error);
      setRequest({
        status: false,
        message: error.message,
      });
    }
  }

  async function deleteTemplate(templateId) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/templates/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          templateId: templateId,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({ isRecieved: true, status: true, message: result.message });
    } catch (error) {
      setResult({
        status: true,
        message: error.message,
      });
    }
  }

  async function deleteTemplateCategory(categoryId) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/templates/category/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          categoryId: categoryId,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({ isRecieved: true, status: true, message: result.message });
    } catch (error) {
      setResult({
        status: true,
        message: error.message,
      });
    }
  }

  async function deleteDocument(documentId) {
    try {
      const token = localStorage.getItem("jwt");
      setRequest({
        isRecieved: false,
        status: null,
        message: "",
      });
      const response = await fetch("/api/v1/documents/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: token,
          documentId: documentId,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      setRequest({ isRecieved: true, status: true, message: result.message });
    } catch (error) {
      setResult({
        status: true,
        message: error.message,
      });
    }
  }

  async function getRecentTemplates() {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch("/api/v1/templates/recent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: jwt,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      const recievedTemplates = result.templates;
      setTemplates([...templates, ...recievedTemplates]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getDocuments() {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch("/api/v1/documents/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: jwt,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw result;
      }
      const recievedDocuments = result.documents;
      setDocuments([...recievedDocuments]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getTemplates() {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("/api/v1/templates/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: jwt,
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      setTemplateCategories(result.templates);
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    templates,
    documents: searchDocuments,
    templateCategories,
    request,
    setSearchQuery,
    setRequest,
    renameTemplate,
    deleteTemplate,
    renameTemplateCategory,
    deleteTemplateCategory,
    renameDocument,
    deleteDocument,
    getRecentTemplates,
    getTemplates,
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
