import { useEffect, useState } from "react";
import Template from "../components/documents/TemplateCard";
import DocumentHeader from "../components/header/DocumentHeader";
import BubbleMenu from "../components/popups/BubbleMenu";

function TemplatesGaliery() {
  const [templates, setTemplates] = useState([]);
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

  useEffect(function () {
    const jwt = localStorage.getItem("jwt");
    const getTemplates = async () => {
      const response = await fetch("/api/v1/templates/all", {
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
      setTemplates([...result.templates]);
    };

    getTemplates();
  }, []);

  return (
    <div>
      <div className="fixed w-[980px] h-24 bg-white"></div>
      <DocumentHeader width="980px" page="Templates gallery" position="fixed" />
      <main className="pt-24">
        <div className="w-[980px] flex flex-col justify-between gap-8">
          {templates.map((template) => {
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
      </main>
    </div>
  );
}

export default TemplatesGaliery;
