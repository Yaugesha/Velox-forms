import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DocumentHeader from "../components/header/DocumentHeader";
import SaveDocuent from "../components/popups/SaveDocuent";
import FillingDocFields from "../components/document-fields/FillingDocFields";

function Document() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, setFields] = useState([]);
  const [personalUserData, setPersonalUserData] = useState({});
  const [workUserData, setWorkUserData] = useState({});
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
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
      setIsUserDataLoaded(true);
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
    [isUserDataLoaded]
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
      alt: "document view",
    },
    {
      image:
        "/src/client/assets/icons/text-editor/icon-document-mode-editing.svg",
      alt: "document filling",
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
          className="self-center px-1 border-2 border-black cursor-pointer"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save document
        </div>
      </DocumentHeader>
      <div className="container w-[1280px] flex gap-64 bg-white">
        <FillingDocFields fields={fields} />
      </div>
      {isPopupOpen ? <SaveDocuent setIsOpen={setPopup} /> : ""}
    </>
  );
}

export default Document;
