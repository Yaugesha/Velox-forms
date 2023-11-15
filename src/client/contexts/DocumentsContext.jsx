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
  const [templateCategories, setTemplateCategories] = useState([
    {
      title: "Create new template",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
      link: "template",
    },
  ]);
  const [result, setResult] = useState({
    status: null,
    message: "",
  });

  async function renameTemplate(templateId, newName) {
    try {
      const token = localStorage.getItem("jwt");
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
      setResult({
        status: true,
        message: result.message,
      });
    } catch (error) {
      console.log(error);
      setResult({
        status: false,
        message: error.message,
      });
    }
  }

  async function deleteTemplate(templateId) {
    try {
      const token = localStorage.getItem("jwt");
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
      setResult({
        status: true,
        message: result.message,
      });
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
      setTemplateCategories([...result.templates]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getRecentTemplates();
    getDocuments();
    getTemplates();
  }, []);

  const value = {
    templates,
    documents,
    templateCategories,
    renameTemplate,
    deleteTemplate,
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
