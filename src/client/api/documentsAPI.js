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
