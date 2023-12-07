export const saveTemplate = async (title, category, fields, userId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const fily = document.querySelector(".tiptap").innerHTML;
    const data = `<div class="document mt-[15] overflow-auto w-[21cm] h-[29.7cm] px-[16mm] py-[27mm] border-2 border-black">${fily}</div>`;
    const response = await fetch("/api/v1/templates/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        data: data,
        title: title,
        category: category,
        fields: fields,
        userId: userId,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    return { template: result.template, status: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
};

export async function renameTemplate(templateId, newName) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/templates/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: token,
      },
      body: JSON.stringify({
        templateId: templateId,
        title: newName,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return { status: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}

export async function renameTemplateCategory(categoryId, newName) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/templates/category/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: token,
      },
      body: JSON.stringify({
        categoryId: categoryId,
        name: newName,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return { status: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}

export async function deleteTemplate(templateId) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/templates/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: token,
      },
      body: JSON.stringify({
        templateId: templateId,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return { status: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}

export async function deleteTemplateCategory(categoryId) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/templates/category/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: token,
      },
      body: JSON.stringify({
        categoryId: categoryId,
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return { status: true, message: result.message };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}

export async function getRecentTemplates() {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/templates/recent", {
      method: "GET",
      headers: {
        Bearer: token,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    const recievedTemplates = result.templates;
    return recievedTemplates;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTemplates() {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/templates/all", {
      method: "GET",
      headers: {
        Bearer: token,
      },
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    return result.templates;
  } catch (error) {
    console.log(error);
  }
}
