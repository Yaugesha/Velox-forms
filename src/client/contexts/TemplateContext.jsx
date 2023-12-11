import { useContext, useState, createContext, useEffect } from "react";
import * as API from "../api/templatesAPI";

const TemplatesContext = createContext();

export function TemplatesProvider({ children }) {
  const [templates, setTemplates] = useState([
    {
      id: 0,
      title: "Create new template",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
      link: "template",
    },
  ]);
  const [templateCategories, setTemplateCategories] = useState([]);
  const [categories, setCategories] = useState([]);

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
  async function renameTemplateCategory(category, newName) {
    const categoryId = category.id;
    const { status, message } = await API.renameTemplateCategory(
      categoryId,
      newName
    );
    if (status) {
      setTemplateCategories(
        templateCategories.map((category) => {
          if (category.id !== categoryId) return category;
          else
            return {
              ...category,
              title: newName,
            };
        })
      );
    }
    return { isRecieved: true, status: status, message: message };
  }
  async function deleteTemplateCategory(category) {
    const { status, message } = await API.deleteTemplateCategory(category.id);
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
  async function getTemplateCategories() {
    const result = await API.getCategories();
    setCategories([...result]);
  }

  const value = {
    templates,
    categories,
    templateCategories,
    saveTemplate,
    renameTemplate,
    deleteTemplate,
    renameTemplateCategory,
    deleteTemplateCategory,
    getRecentTemplates,
    getTemplates,
    getTemplateCategories,
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
