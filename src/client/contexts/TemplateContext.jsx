import { useContext, useState, createContext, useEffect } from "react";
import * as API from "../api/templatesAPI";

const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([
    {
      title: "Create new template",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
      link: "template",
    },
  ]);
  const [templateCategories, setTemplateCategories] = useState([]);

  async function renameTemplate(templateId, newName) {
    const { status, message } = await API.renameTemplate(templateId, newName);
    return { isRecieved: true, status: status, message: message };
  }
  async function renameTemplateCategory(templateId, newName) {
    const { status, message } = await API.renameTemplateCategory(
      templateId,
      newName
    );
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteTemplateCategory(templateId, newName) {
    const { status, message } = await API.deleteTemplateCategory(
      templateId,
      newName
    );
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteTemplate(templateId, newName) {
    const { status, message } = await API.deleteTemplate(templateId, newName);
    return { isRecieved: true, status: status, message: message };
  }
  async function saveTemplate(title, category, fields, userId) {
    const { status, message } = await API.saveTemplate(
      title,
      category,
      fields,
      userId
    );
    return { isRecieved: true, status: status, message: message };
  }
  async function getRecentTemplates() {
    const result = await API.getRecentTemplates();
    setTemplates([templates[0], ...result]);
  }
  async function getTemplates() {
    const result = await API.getTemplates();
    setTemplateCategories([...result]);
  }

  const value = {
    templates,
    templateCategories,
    saveTemplate,
    renameTemplate,
    deleteTemplate,
    renameTemplateCategory,
    deleteTemplateCategory,
    getRecentTemplates,
    getTemplates,
  };

  return (
    <TemplatesContext.Provider value={value}>
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplatesContext);
  return context;
}
