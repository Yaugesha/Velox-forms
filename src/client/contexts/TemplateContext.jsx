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

  async function renameTemplate(template, newName) {
    const { status, message } = await API.renameTemplate(template.id, newName);
    if (status) {
      setTemplates(
        templates.map((templ) => {
          if (templ.id !== template.id) return templ;
          else return { ...templ, title: newName };
        })
      );
      setTemplateCategories(
        templateCategories.map((category) => {
          if (category.id !== template.templateCategoryId) return category;
          else
            return {
              ...category,
              templates: category.templates.map((templ) => {
                console.log(templ.id !== template.id);
                if (templ.id !== template.id) return templ;
                else return { ...templ, title: newName };
              }),
            };
        })
      );
    }
    return { isRecieved: true, status: status, message: message };
  }
  async function renameTemplateCategory(templateId, newName) {
    const { status, message } = await API.renameTemplateCategory(
      templateId,
      newName
    );
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteTemplateCategory(templateId) {
    const { status, message } = await API.deleteTemplateCategory(
      templateId,
      newName
    );
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteTemplate(template) {
    const { status, message } = await API.deleteTemplate(template.id);
    if (status) {
      setTemplates([
        ...templates.filter((templ) => {
          return templ.id !== template.id;
        }),
      ]);
      setTemplateCategories(
        templateCategories.map((category) => {
          if (category.id !== template.templateCategoryId) return category;
          else
            return {
              ...category,
              templates: category.templates.filter((templ) => {
                return templ.id !== template.id;
              }),
            };
        })
      );
    }
    return { isRecieved: true, status: status, message: message };
  }
  async function saveTemplate(title, category, fields, userId) {
    const { template, status, message } = await API.saveTemplate(
      title,
      category,
      fields,
      userId
    );
    if (status) {
      setTemplates([...templates, template]);
      setTemplateCategories(
        templateCategories.map((category) => {
          console.log(category);
          if (category.id !== template.templateCategoryId) return category;
          else
            return {
              ...category,
              templates: [...category.templates, template],
            };
        })
      );
    }
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
