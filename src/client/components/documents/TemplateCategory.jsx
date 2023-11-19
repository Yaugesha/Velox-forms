import { useState } from "react";
import TemplateCard from "./TemplateCard";
import BubbleMenu from "../modals/bubble-menus/BubbleMenu";

function TemplateCategory({ category }) {
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
    <div key={category.title}>
      <div className="flex justify-between items-center mb-5 ml-2 ">
        <h4 className="flex leading-6 text-base">{category.title}</h4>
        <img
          className="cursor-pointer"
          src="/src/client/assets/icons/general/icon-more.svg"
          alt="show more"
          onClick={openBubbleMenu}
        />
        {isBubbleMenuOpen && (
          <BubbleMenu
            setIsOpen={setBubbleMenuOpen}
            data={category}
            top={bubbleMenuY}
            left={bubbleMenuX}
            items={bubbleMenuItems}
            width={140}
          />
        )}
      </div>
      {category.templates !== undefined && (
        <div className="flex flex-wrap gap-5">
          {category.templates.map((template) => {
            return <TemplateCard template={template} key={template.title} />;
          })}
        </div>
      )}
    </div>
  );
}

export default TemplateCategory;
