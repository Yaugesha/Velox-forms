export async function renameDocument(documentId, newName) {
  try {
    const token = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/documents/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: token,
      },
      body: JSON.stringify({
        documentId: documentId,
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

export const saveDocument = async (title) => {
  try {
    const fieldStyle = "bg-black text-white px-0.5";
    const data = document.querySelector(".document").outerHTML;
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("/api/v1/documents/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        data: data,
        file: data.replaceAll(fieldStyle, ""),
        title: title,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }

    return {
      document: result.document,
      status: true,
      message: "Document saved",
    };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
};

export async function deleteDocument(documentId) {
  try {
    const jwt = localStorage.getItem("jwt");

    const response = await fetch("/api/v1/documents/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        documentId: documentId,
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

export async function getDocuments() {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await fetch("/api/v1/documents/all", {
      method: "GET",
      headers: {
        Bearer: jwt,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    return result.documents;
  } catch (error) {
    console.log(error.message);
  }
}
