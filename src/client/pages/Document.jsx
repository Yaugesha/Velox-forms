import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DocumentHeader from "../components/header/DocumentHeader";
import DocumentContext from "../contexts/DocumentContext";
import SaveDocuent from "../components/popups/SaveDocuent";
import InputFields from "../components/document-fields/InputFields";

function Document() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fields, setFields] = useState([]);
  const [personalUserData, setPersonalUserData] = useState({});
  const [workUserData, setWorkUserData] = useState({});
  const [isPopupOpen, setPopup] = useState(false);
  const [layout, setLayout] = useState("");
  const [documentMode, setDocumentMode] = useState("document filling");

  useEffect(function () {
    const getLayout = async () => {
      const response = await fetch("/api/v1/templates/layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
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
    };
    const getUserData = async () => {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("/api/v1/users/personal-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          jwt: jwt,
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      setPersonalUserData(result.userData.personal);
      setWorkUserData(result.userData.work);
    };
    getLayout();
    getUserData();
  }, []);

  useEffect(
    function () {
      function insertLayout() {
        const documentLayout = document.createElement("div");
        document.querySelector(".container").prepend(documentLayout);
        documentLayout.outerHTML = layout;
      }
      function findFileds() {
        const fields = Array.from(
          document.querySelectorAll(".react-component")
        );
        if (fields.length === 0) return;
        const sortedFields = fields.sort((a, b) => {
          a.classList[5] - b.classList[5];
        });
        setFields([
          ...new Set(
            sortedFields.map((field) => {
              return field.textContent;
            })
          ),
        ]);
      }
      if (documentMode === "document filling") insertLayout();
      findFileds();
    },
    [layout]
  );

  useEffect(
    function () {
      function findUserDataFields(userData, fieldName, field) {
        Object.keys(userData).forEach((key) => {
          if (fieldName === key.toLowerCase()) {
            field.innerText = userData[key];
            document.querySelector(`#${fieldName}`).value = userData[key];
          }
        });
      }
      const fields = Array.from(document.querySelectorAll(".react-component"));
      fields.forEach((field) => {
        const fieldName = field.classList[6];
        findUserDataFields(personalUserData, fieldName, field);
        findUserDataFields(workUserData, fieldName, field);
      });
    },
    [personalUserData, workUserData]
  );

  useEffect(
    function () {
      if (documentMode === "document filling") {
        const container = document.querySelector(".container");
        if (container.lastChild === null) return;
        container.firstChild.outerHTML = layout;
      } else {
        setLayout(document.querySelector(".document").outerHTML);
        const fields = document.querySelectorAll(".react-component");
        fields.forEach((field) => {
          field.classList.remove("bg-black");
          field.classList.remove("text-white");
          field.classList.remove("px-0.5");
        });
      }
    },
    [documentMode]
  );

  const buttons = [
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-preview.svg",
      alt: "document view",
    },
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-editing.svg",
      alt: "document filling",
    },
  ];

  const documentProps = {
    fields,
    setFields,
  };

  return (
    <DocumentContext.Provider value={documentProps}>
      <DocumentHeader
        width="1280px"
        page="Document"
        navButtons={buttons}
        handleCLick={setDocumentMode}
      >
        <div
          className="self-center px-1 border-2 border-black cursor-pointer"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save document
        </div>
      </DocumentHeader>
      <div className="container w-[1280px] flex gap-64 bg-white">
        <InputFields />
      </div>
      {isPopupOpen ? <SaveDocuent setIsOpen={setPopup} /> : ""}
    </DocumentContext.Provider>
  );
}

export default Document;
