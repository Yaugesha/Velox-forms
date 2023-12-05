import { useState } from "react";
import { useDocuments } from "../../contexts/DocumentsContext";
import DocumentCard from "./DocumentCard";
import DocumentList from "./DocumentList";
import SortButton from "./SortButton";

function DocumnetsSection() {
  const { documents, search } = useDocuments();

  const [displayDocs, setDisplayDocs] = useState("table");
  const [nameSort, setNameSort] = useState("ascending");
  const [dateSort, setDateSort] = useState("descending");
  const [active, setActive] = useState("date");

  return (
    <section className="w-[980px] flex flex-col items-center ">
      <div className="mb-6">
        <div className="flex items-center">
          <span>Recent documents</span>
          <input
            onChange={(e) => {
              console.log("input");
              search(e.target.value);
            }}
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
      {documents !== undefined && (
        <>
          {displayDocs === "table" ? (
            <div className="flex w-[100%] flex-wrap gap-y-5 gap-x-6">
              {documents.map((document) => {
                return <DocumentCard document={document} key={document.id} />;
              })}
            </div>
          ) : (
            <div className="w-[980px] flex flex-col justify-between flex-wrap gap-y-5">
              {documents.map((document) => {
                return (
                  <DocumentList document={document} key={document.title} />
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default DocumnetsSection;
