import { useEffect, useState } from "react";
import Template from "../components/documents/TemplateCard";
import DocumentHeader from "../components/header/DocumentHeader";
import BubbleMenu from "../components/popups/BubbleMenu";
import { useDocuments } from "../contexts/DocumentsContext";

function TemplatesGaliery() {
  const { templateCategories } = useDocuments();

  const [isBubbleMenuOpen, setBubbleMenuOpen] = useState(false);
  const [bubbleMenuX, setBubbleMenuX] = useState("");
  const [bubbleMenuY, setBubbleMenuY] = useState("");

  function openBubbleMenu(e) {
    setBubbleMenuOpen(true);
    setBubbleMenuY(e.target.offsetTop + 30);
    setBubbleMenuX(e.target.offsetLeft - 120);
  }

  const bubbleMenuItems = [
    {
      icon: "/src/client/assets/icons/general/icon-rename.svg",
      name: "Rename",
      action: "",
    },
    {
      icon: "/src/client/assets/icons/general/icon-delete.svg",
      name: "Delete",
      action: "",
    },
  ];

  return (
    <div>
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="pt-24">
        {templateCategories !== undefined && (
          <div className="w-[980px] flex flex-col justify-between gap-8">
            {templateCategories.map((template) => {
              return (
                <div key={template.category}>
                  <div className="flex justify-between items-center mb-5 ml-2 ">
                    <h4 className="flex leading-6 text-base">
                      {template.category}
                    </h4>
                    <img
                      className="cursor-pointer"
                      src="/src/client/assets/icons/general/icon-more.svg"
                      alt="show more"
                      onClick={openBubbleMenu}
                    />
                  </div>
                  {template.templates !== undefined && (
                    <div className="flex flex-wrap gap-5">
                      {template.templates.map((template) => {
                        return (
                          <Template
                            title={template.title}
                            description={template.description}
                            picture={template.picture}
                            link={`../${template.link}`}
                            key={template.title}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {isBubbleMenuOpen && (
              <BubbleMenu
                setIsOpen={setBubbleMenuOpen}
                top={bubbleMenuY}
                left={bubbleMenuX}
                items={bubbleMenuItems}
                width={140}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default TemplatesGaliery;
