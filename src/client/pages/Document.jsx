import InputFields from "../components/document-fields/InputFields";
import { useState, useEffect, useReducer } from "react";
import DocumentHeader from "../components/header/DocumentHeader";
import DocumentContext from "../contexts/DocumentContext";
import SaveDocuent from "../components/popups/SaveDocuent";
import { useSearchParams } from "react-router-dom";

function Document() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fields, setFields] = useState([]);
  const [isPopupOpen, setPopup] = useState(false);
  const [layout, setLayout] = useState("");

  function addField(newField) {
    setFields([...fields, newField]);
  }
  function removeField(fieldToRemove) {
    setFields(fields.filter((field) => field !== fieldToRemove));
  }

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
    getLayout();
  }, []);

  useEffect(
    function () {
      function insertLayout() {
        const documentLayout = document.createElement("div");
        document.querySelector(".container").prepend(documentLayout);
        documentLayout.outerHTML = layout;
        findFileds();
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
      insertLayout();
    },
    [layout]
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
    addField,
    removeField,
    setFields,
  };

  const initialMode = {
    showMenu: "hidden",
    displayInput: "block",
  };

  function changeMode(state, action) {
    switch (action.name) {
      case "document view": {
        return {
          ...state,
          showMenu: "hidden",
          displayInput: "hidden",
        };
      }
      case "document filling": {
        return {
          ...state,
          showMenu: "hidden",
          displayInput: "block",
        };
      }
    }
  }

  const [mode, dispatch] = useReducer(changeMode, initialMode);

  return (
    <DocumentContext.Provider value={documentProps}>
      <DocumentHeader
        width="1280px"
        page="Document"
        navButtons={buttons}
        handleCLick={dispatch}
      >
        <div
          className="self-center px-1 border-2 border-black"
          onClick={() => {
            setPopup(true);
          }}
        >
          Save document
        </div>
      </DocumentHeader>
      <div className="container w-[1280px] flex gap-64 bg-white">
        <InputFields display={mode.displayInput} />
      </div>
      {isPopupOpen ? <SaveDocuent setIsOpen={setPopup} /> : ""}
    </DocumentContext.Provider>
  );
}

export default Document;
