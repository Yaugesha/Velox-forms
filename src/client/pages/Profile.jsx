import { useRef } from "react";
import Document from "../components/cards/Document";
import Template from "../components/cards/Template";

function Profile() {
  const templates = useRef([
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
    {
      title: "New document",
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
      type: "doc",
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
      type: "doc",
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
      type: "doc",
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
      type: "doc",
      date: "13 September 2023y",
      picture: "src/client/assets/icons/tamplates/icon-plus.svg",
    },
  ]);
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
            <li className="cursor-pointer bg-black text-white h-7 text-sm">
              Profile
            </li>
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
                <Template title={template.title} picture={template.picture} />
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
                <img
                  className="cursor-pointer"
                  src="src/client/assets/icons/sorts/icon-show-list.svg"
                  alt="list"
                />
                <img
                  className="cursor-pointer"
                  src="src/client/assets/icons/sorts/icon-name-ascending.svg"
                  alt="a-z"
                />
                <img
                  className="cursor-pointer"
                  src="src/client/assets/icons/sorts/icon-date-ascending.svg"
                  alt="newest"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-wrap">
            {documents.current.map((document) => {
              return (
                <Document
                  title={document.title}
                  type={document.type}
                  date={document.date}
                  picture={document.picture}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
