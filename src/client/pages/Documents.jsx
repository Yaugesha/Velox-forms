import { useRef, useState } from "react";
import Template from "../components/cards/Template";
import Document from "../components/cards/Document";
import DocumentList from "../components/cards/DocumentList";

function Documents() {
  const templates = useRef([
    {
      title: "New document1",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document2",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document3",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document4",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document5",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ]);
  const documents = useRef([
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ]);

  const [displayDocs, setDisplayDocs] = useState("table");
  const [nameSort, setNameSort] = useState("ascending");
  const [dateSort, setDateSort] = useState("ascending");
  return (
    <>
      <header className="w-[980px] h-12 flex flex-row justify-between items-center border-b-2 border-solid border-black">
        <img
          className="h-7"
          src="src/client/assets/icons/logo/logo-header.png"
          alt="Logo"
        />
        <nav>
          <ul className="flex flex-row gap-20">
            <li className="text-sm cursor-pointer">About</li>
            <li className="text-sm cursor-pointer">Documentation</li>
            <li className="cursor-pointer bg-black text-white leading-7 text-sm">
              Documents
            </li>
            <li className="text-sm cursor-pointer">Profile</li>
          </ul>
        </nav>
      </header>
      <main className="w-[980px]">
        <section className="mb-8 w-[980px] flex flex-col items-center">
          <div className="w-[980px] flex justify-between items-center mt-10 mb-5">
            <div>
              <h3>Create new document</h3>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex w-[154px] gap-x-2.5 cursor-pointer">
                Templates gallery
                <img
                  src="src/client/assets/icons/general/icon-arrows.svg"
                  alt="t"
                />
              </div>
              <img
                className="h-6 cursor-pointer"
                src="src/client/assets/icons/general/icon-more.svg"
                alt="show more"
              />
            </div>
          </div>
          <div className="w-[980px] flex justify-between mb-7">
            {templates.current.map((template) => {
              return (
                <Template
                  title={template.title}
                  picture={template.picture}
                  key={template.title}
                />
              );
            })}
          </div>
        </section>
        <section className="w-[980px] flex flex-col items-center ">
          <div className="mb-6">
            <div className="flex items-center">
              <span>Recent documents</span>
              <input
                className="w-[357px] h-8 border border-black pl-4 ml-[96px] mr-[214px]"
                type="text"
              />
              <div className="flex justify-between items-center w-[129px]">
                {displayDocs === "table" ? (
                  <img
                    onClick={() => setDisplayDocs("list")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-show-list.svg"
                    alt="list"
                  />
                ) : (
                  <img
                    onClick={() => setDisplayDocs("table")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-show-table.svg"
                    alt="table"
                  />
                )}
                {nameSort === "ascending" ? (
                  <img
                    onClick={() => setNameSort("descending")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-name-ascending.svg"
                    alt="z-a"
                  />
                ) : (
                  <img
                    onClick={() => setNameSort("ascending")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-name-descending.svg"
                    alt="a-z"
                  />
                )}
                {dateSort === "ascending" ? (
                  <img
                    onClick={() => setDateSort("descending")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-date-ascending.svg"
                    alt="newest"
                  />
                ) : (
                  <img
                    onClick={() => setDateSort("ascending")}
                    className="cursor-pointer"
                    src="src/client/assets/icons/sorts/icon-date-descending.svg"
                    alt="oldest"
                  />
                )}
              </div>
            </div>
          </div>
          {displayDocs === "table" ? (
            <div className="flex justify-between flex-wrap gap-y-5">
              {documents.current.map((document) => {
                return (
                  <Document
                    title={document.title}
                    type={document.type}
                    date={document.date}
                    picture={document.picture}
                    key={document.title}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-[980px] flex flex-col justify-between flex-wrap gap-y-5">
              {documents.current.map((document) => {
                return (
                  <DocumentList
                    title={document.title}
                    type={document.type}
                    date={document.date}
                    picture={document.picture}
                    key={document.title}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Documents;
