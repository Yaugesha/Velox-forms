import { useTemplate } from "../../contexts/TemplateContext";
import { useBubbleMenu } from "../../contexts/BubbleMenuContext";
import { Link } from "react-router-dom";

function TemplateCard({ template }) {
  const { deleteTemplate, renameTemplate } = useTemplate();
  const { open } = useBubbleMenu();

  const bubbleMenuItems = [
    {
      icon: "/src/client/assets/icons/general/icon-rename.svg",
      name: "Rename",
      action: renameTemplate,
    },
    {
      icon: "/src/client/assets/icons/general/icon-delete.svg",
      name: "Delete",
      action: deleteTemplate,
    },
  ];

  return (
    <div className="duration-100 hover:drop-shadow-md">
      <Link to={template.link}>
        <div className="flex justify-center items-center mb-2.5 w-[180px] h-[233px] border-[1px] border-[#dadce0] pointer">
          <img src={template.picture} alt="template photo" />
        </div>
      </Link>
      <div className="flex justify-between">
        <Link to={template.link}>
          <div className="flex flex-col">
            <div className="font-medium">{template.title}</div>
            {/* <div className="text-[#5f6368]">{template.description}</div> */}
          </div>
        </Link>
        <img
          onClick={(e) =>
            open(
              { y: e.target.offsetTop, x: e.target.offsetLeft },
              template,
              bubbleMenuItems
            )
          }
          className="p-0.5 -mx-2 cursor-pointer rounded-full duration-300 hover:bg-stone-200"
          src="/src/client/assets/icons/general/icon-more.svg"
          alt="more"
        />
      </div>
    </div>
  );
}

export default TemplateCard;
