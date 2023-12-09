import { useTemplate } from "../../contexts/TemplateContext";
import { useBubbleMenu } from "../../contexts/BubbleMenuContext";
import TemplateCard from "./TemplateCard";

function TemplateCategory({ category }) {
  const { deleteTemplateCategory, renameTemplateCategory } = useTemplate();
  const { open } = useBubbleMenu();

  const bubbleMenuItems = [
    {
      icon: "/src/client/assets/icons/general/icon-rename.svg",
      name: "Rename",
      action: renameTemplateCategory,
    },
    {
      icon: "/src/client/assets/icons/general/icon-delete.svg",
      name: "Delete",
      action: deleteTemplateCategory,
    },
  ];

  return (
    <div key={category.title}>
      <div className="flex justify-between items-center mb-5 ml-2 ">
        <h4 className="flex leading-6 text-base">{category.title}</h4>
        <img
          onClick={(e) =>
            open(
              { y: e.target.offsetTop, x: e.target.offsetLeft },
              category,
              bubbleMenuItems
            )
          }
          className="p-1 cursor-pointer rounded-full duration-300 hover:bg-stone-200"
          src="/src/client/assets/icons/general/icon-more.svg"
          alt="show more"
        />
      </div>
      {category.templates !== undefined && (
        <div className="flex flex-wrap gap-5">
          {category.templates.map((template) => {
            return (
              <TemplateCard
                template={{ ...template, link: `../${template.link}` }}
                key={template.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TemplateCategory;
