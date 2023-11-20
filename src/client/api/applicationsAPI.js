export const findApplications = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await fetch("/api/v1/applications/get", {
    method: "POST",
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
    error: false,
    message: "Application recieved",
  };
};

export const submitAplication = async (
  referenceFile,
  category,
  title,
  comment
) => {
  if (!referenceFile || !category || !title) {
    return {
      error: true,
      message: "You must fill category, title and provide reference file",
    };
  }
  let fileLink = "";
  console.log(referenceFile);
  if (referenceFile) {
    fileLink = await uploadFile(referenceFile);
  }
  return await saveApplication(category, title, fileLink, comment);
};
