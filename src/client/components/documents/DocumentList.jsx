import { useDocuments } from "../../contexts/DocumentsContext";
import { useBubbleMenu } from "../../contexts/BubbleMenuContext";
import { Link } from "react-router-dom";

function DocumentList({ document }) {
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
    <div className="w-[980px] h-[50px] flex items-center border-b-2 border-bl">
      <Link to={document.link}>
        <div className="w-[956px] flex items-center">
          <span className="w-[70%] mx-3.5 inline-flex items-center font-medium">
            {document.title}
          </span>
          <span className="mr-8 flex items-center leading-5 font-medium">
            {document.date}
          </span>
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
        className="h-6 w-6 cursor-pointer"
        src="/src/client/assets/icons/general/icon-more.svg"
        alt="more"
      />
    </div>
  );
}

export default DocumentList;
