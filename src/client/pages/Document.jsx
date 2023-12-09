import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DocumentHeader from "../components/header/DocumentHeader";
import SaveDocument from "../components/modals/documents/SaveDocument";
import FillingDocFields from "../components/document-fields/FillingDocFields";

function Document() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, setFields] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isPopupOpen, setPopup] = useState(false);
  const [layout, setLayout] = useState("");
  const [documentMode, setDocumentMode] = useState("document filling");

  useEffect(function () {
    const getLayout = async () => {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("/api/v1/templates/layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Bearer: jwt,
        },
        body: JSON.stringify({
          templateId: searchParams.get("templateId"),
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      setLayout(result.layout);
      setFields(Object.keys(result.fieldsValues));
      setUserData(result.fieldsValues);
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

  function toggleFieldsInDoc(state) {
    setDocumentMode(state);
    if (documentMode !== state) {
      const fields = document.querySelectorAll(".react-component");
      const fieldStyle = "bg-black text-white px-0.5";
      const textStyle = "bg-white text-black px-0";
      fields.forEach((field) => {
        const fieldClassName = field.className;
        if (state === "document view") {
          field.className = fieldClassName.replaceAll(fieldStyle, textStyle);
        } else {
          field.className = fieldClassName.replaceAll(textStyle, fieldStyle);
        }
      });
    }
  }

  const buttons = [
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-preview.svg",
      alt: "view",
    },
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-editing.svg",
      alt: "fill",
    },
  ];

  return (
    <>
      <DocumentHeader
        width="1280px"
        page="Document"
        navButtons={buttons}
        handleCLick={toggleFieldsInDoc}
      >
        <div
          className="self-center px-1 border-2 border-black cursor-pointer duration-300 hover:bg-black hover:text-white"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save document
        </div>
      </DocumentHeader>
      <div className="flex justify-center">
        <div className="container w-[1280px] flex gap-64 bg-white">
          <FillingDocFields fields={fields} userData={userData} />
        </div>
      </div>
      {isPopupOpen ? <SaveDocument setIsOpen={setPopup} /> : ""}
    </>
  );
}

export default Document;
