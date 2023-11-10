import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DocumentHeader from "../components/header/DocumentHeader";

function Document() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState("");

  useEffect(function () {
    console.log("file");
    const getLayout = async () => {
      const response = await fetch("/api/v1/documents/file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          documentId: searchParams.get("documentId"),
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      setLayout(result.layout);
    };
    getLayout();
  }, []);

  useEffect(
    function () {
      function insertLayout() {
        const documentLayout = document.createElement("div");
        document.querySelector(".container").prepend(documentLayout);
        documentLayout.outerHTML = layout;
      }
      insertLayout();
    },
    [layout]
  );

  return (
    <>
      <DocumentHeader width="1280px" page="Document" />
      <div className="container w-[1280px] flex justify-center bg-white"></div>
    </>
  );
}

export default Document;
