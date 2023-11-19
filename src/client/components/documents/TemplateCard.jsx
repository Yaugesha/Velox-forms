import { useState } from "react";
import { Link } from "react-router-dom";
import BubbleMenu from "../modals/bubble-menus/BubbleMenu";

function TemplateCard({ template }) {
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
    {
      icon: "/src/client/assets/icons/general/icon-rename-description.svg",
      name: "Change description",
      action: "",
    },
    // {
    //   icon: "/src/client/assets/icons/general/icon-open-in-new-tab.svg",
    //   name: "Open in new tab",
    //   action: "",
    // },
    ,
  ];

  return (
    <div>
      <Link to={template.link}>
        <div className="flex justify-center items-center mb-2.5 w-[180px] h-[233px] border-[1px] border-[#dadce0] pointer">
          <img src={template.picture} alt="template photo" />
        </div>
      </Link>
      <div className="flex justify-between">
        <Link to={template.link}>
          <div className="flex flex-col">
            <div className="font-medium">{template.title}</div>
            <div className="text-[#5f6368]">{template.description}</div>
          </div>
        </Link>
        <img
          onClick={openBubbleMenu}
          className="-mx-2 cursor-pointer"
          src="/src/client/assets/icons/general/icon-more.svg"
          alt="more"
        />
      </div>
      {isBubbleMenuOpen && (
        <BubbleMenu
          setIsOpen={setBubbleMenuOpen}
          data={template}
          top={bubbleMenuY}
          left={bubbleMenuX}
          items={bubbleMenuItems}
          width={"264"}
        />
      )}
    </div>
  );
}

export default TemplateCard;
