import { useRef } from "react";
import Template from "../components/documents/Template";
import { useNavigate } from "react-router-dom";

function TemplaytesGaliery() {
  const templatesArr = useRef([
    {
      type: "Favorite",
      templaytes: [
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
      ],
    },
    {
      type: "Popular1",
      templaytes: [
        {
          title: "New document1",
          description: "description",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
        {
          title: "New document",
          description: "description",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
        {
          title: "New document2",
          description: "description",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
      ],
    },
    {
      type: "Popular2",
      templaytes: [
        {
          title: "New document1",
          description: "description",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
      ],
    },
    {
      type: "Popular3",
      templaytes: [
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
        {
          title: "New document6",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
        {
          title: "New document7",
          picture: "/src/client/assets/icons/tamplates/icon-plus.svg",
        },
      ],
    },
  ]);
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 bg-white">
      <header className="w-[980px] fixed flex border-b-2 bg-white border-solid border-black">
        <div className="flex items-center text-base leading-6 ">
          <div
            onClick={() => navigate(-1)}
            className="inline-block items-center w-12 cursor-pointer mr-5 ml-3 p-3 font-bold leading-7 text-2xl text-black font-serif"
          >
            &larr;
          </div>
          <span className="mr-2">Templates gallery</span>
        </div>
      </header>
      <main>
        <div className="w-[980px] mt-24 flex flex-col justify-between gap-8">
          {templatesArr.current.map((template) => {
            return (
              <div key={template.type}>
                <h4 className="flex mb-5 ml-2 leading-6 text-base">
                  {template.type}
                </h4>
                <div className="flex flex-wrap gap-5">
                  {template.templaytes.map((template) => {
                    return (
                      <Template
                        title={template.title}
                        description={template.description}
                        picture={template.picture}
                        key={template.title}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default TemplaytesGaliery;
