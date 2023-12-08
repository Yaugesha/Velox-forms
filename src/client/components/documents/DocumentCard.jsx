import { useDocuments } from "../../contexts/DocumentsContext";
import { useBubbleMenu } from "../../contexts/BubbleMenuContext";
import { Link } from "react-router-dom";

function DocumentCard({ document }) {
  const { deleteDocument, renameDocument } = useDocuments();
  const { open } = useBubbleMenu();

  const bubbleMenuItems = [
    {
      icon: "/src/client/assets/icons/general/icon-rename.svg",
      name: "Rename",
      action: renameDocument,
    },
    {
      icon: "/src/client/assets/icons/general/icon-delete.svg",
      name: "Delete",
      action: deleteDocument,
    },
  ];

  return (
    <div className="w-[225px] h-[340px] border-[1px] border-[#dadce0] duration-500 hover:border-black">
      <Link to={document.link}>
        <div className="flex justify-center items-center w-[225px] h-[260px] border-b-[1px]">
          <img src={document.picture} alt="document" />
        </div>
      </Link>
      <div className="pt-4 pb-5 pl-4">
        <Link to={document.link}>
          <span>
            {document.title}.{document.type}
          </span>
        </Link>
        <div className="w-[204px] flex justify-between items-center">
          <Link to={document.link}>
            <div className="flex items-center">
              <p className="text-[12px]">{document.date}.</p>
            </div>
          </Link>
          <img
            onClick={(e) =>
              open(
                { y: e.target.offsetTop, x: e.target.offsetLeft },
                document,
                bubbleMenuItems
              )
            }
            className="p-1 -m-1 mr-0 cursor-pointer rounded-full duration-300 hover:bg-stone-200"
            src="/src/client/assets/icons/general/icon-more.svg"
            alt="more"
          />
        </div>
      </div>
    </div>
  );
}
export default DocumentCard;
