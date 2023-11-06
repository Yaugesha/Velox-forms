import { useEffect, useState } from "react";
import TemplateCard from "../components/documents/TemplateCard";
import DocumentCard from "../components/documents/DocumentCard";
import DocumentList from "../components/documents/DocumentList";
import { Link, useLocation, Outlet } from "react-router-dom";
import SortButton from "../components/documents/SortButton";
import Header from "../components/header/Header";

function Documents() {
  const [templates, setTemplates] = useState([
    {
      title: "Create new document",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
      link: "template",
    },
  ]);

  const documents = [
    {
      title: "Document name1",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name2",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name3",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name4",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name5",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name6",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name7",
      type: "doc",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "Document name8",
      type: "pdf",
      date: "13 September 2023y",
      picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ];

  useEffect(function () {
    const jwt = localStorage.getItem("jwt");
    const getTemplates = async () => {
      const response = await fetch("/api/v1/templates/recent", {
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
      const recievedTemplates = result.templates.map((template) => {
        return {
          title: template.title,
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        };
      });
      setTemplates([...templates, ...recievedTemplates]);
    };

    getTemplates();
  }, []);

  const [displayDocs, setDisplayDocs] = useState("table");
  const [nameSort, setNameSort] = useState("ascending");
  const [dateSort, setDateSort] = useState("ascending");
  const [active, setActive] = useState("date");
  const location = useLocation();
  return (
    <>
      {location.pathname.split("/")[2] !== undefined ? (
        <Outlet />
      ) : (
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
              <div className="w-[980px] flex gap-5 mb-7">
                {templates.map((template) => {
                  return (
                    <TemplateCard
                      title={template.title}
                      picture={template.picture}
                      link={template.link}
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
                    placeholder="Search: file name"
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
                  {documents.map((document) => {
                    return (
                      <DocumentCard
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
      )}
    </>
  );
}

export default Documents;
