export const findApplications = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await fetch("/api/v1/applications/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Bearer: jwt,
    },
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw Error(result.message);
  }
  return result.applications;
};

export const findApplication = async (applicationId) => {
  const jwt = localStorage.getItem("jwt");
  const response = await fetch("/api/v1/applications/getApplication", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Bearer: jwt,
      ApplicationId: applicationId,
    },
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw Error(result.message);
  }
  return result.application;
};

export const findAllApplications = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await fetch("/api/v1/applications/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Bearer: jwt,
    },
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw Error(result.message);
  }
  return result.applications;
};

export const uploadFile = async (referenceFile) => {
  const formData = new FormData();
  formData.append("file", referenceFile);
  const response = await fetch("/api/v1/applications/save", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if (response.status !== 200) {
    throw Error(result.message);
  }
  return result.fileLink;
};

export const saveApplication = async (category, title, fileLink, comment) => {
  const jwt = localStorage.getItem("jwt");
  const respon = await fetch("/api/v1/applications/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Bearer: jwt,
    },
    body: JSON.stringify({
      category: category,
      title: title,
      file: fileLink,
      comment: comment,
    }),
  });
  const result = await respon.json();

  if (respon.status !== 200) {
    throw Error(result.message);
  }
  return {
    application: result.application,
    error: false,
    message: result.message,
  };
};

export const submitAplication = async ({
  referenceFile,
  category,
  name,
  comment,
}) => {
  if (!referenceFile || !category || !name) {
    return {
      error: true,
      message: "You must fill category, title and provide reference file",
    };
  }
  let fileLink = "";
  if (referenceFile) {
    fileLink = await uploadFile(referenceFile);
  }
  return await saveApplication(category, name, fileLink, comment);
};

export const deleteApplication = async (applicationId) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/applications/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        applicationId: applicationId,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) throw Error(result.message);
    return { status: true, message: result.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const editApplication = async (application) => {
  const jwt = localStorage.getItem("jwt");
  console.log(application);
  try {
    const response = await fetch("/api/v1/applications/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        applicationId: application.applicationId,
        referenceFile: application.referenceFile,
        category: application.category,
        name: application.name,
        comment: application.comment,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) throw Error(result.message);
    return { status: true, message: result.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const changeStatus = async (applicationId, name, comment) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/applications/changeStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        applicationId: applicationId,
        name: name,
        comment: comment,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) throw Error(result.message);
    return { status: true, message: result.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
