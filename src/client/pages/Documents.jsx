import { useRef, useState } from "react";
import Template from "../components/documents/Template";
import Document from "../components/documents/Document";
import DocumentList from "../components/documents/DocumentList";
import { Link, NavLink, Outlet } from "react-router-dom";
import SortButton from "../components/documents/SortButton";
import Header from "../components/documents/Header";

function Documents() {
  const templates = useRef([
    {
      title: "New document1",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document2",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document3",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document4",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document5",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ]);
  const documents = useRef([
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ]);

  const [displayDocs, setDisplayDocs] = useState("table");
  const [nameSort, setNameSort] = useState("ascending");
  const [dateSort, setDateSort] = useState("ascending");
  const [active, setActive] = useState("date");
  return (
    <>
      <Header isAuthorized={true} page={"Documents"} />
      <main className="w-[980px]">
        <section className="mb-8 w-[980px] flex flex-col items-center">
          <div className="w-[980px] flex justify-between items-center mt-10 mb-5">
            <div>
              <h3>Create new document</h3>
            </div>
            <div className="flex justify-between items-center gap-8">
              <Link to="templates">
                <div className="flex w-[154px] gap-x-2.5">
                  Templates gallery
                  <img
                    src="/src/client/assets/icons/general/icon-arrows.svg"
                    alt="t"
                  />
                </div>
              </Link>
              <img
                className="h-6 cursor-pointer"
                src="/src/client/assets/icons/general/icon-more.svg"
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
                <SortButton
                  type={"show"}
                  kind={displayDocs}
                  changeKind={setDisplayDocs}
                />
                <SortButton
                  type={"name"}
                  kind={nameSort}
                  changeKind={setNameSort}
                  setActive={setActive}
                  active={active}
                />
                <SortButton
                  type={"date"}
                  kind={dateSort}
                  changeKind={setDateSort}
                  setActive={setActive}
                  active={active}
                />
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
        <Outlet />
      </main>
    </>
  );
}

export default Documents;
