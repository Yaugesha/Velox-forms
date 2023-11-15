import { useState } from "react";
import BubbleMenu from "../popups/BubbleMenu";
import { Link } from "react-router-dom";

function DocumentCard({ document }) {
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
    <div className="w-[225px] h-[340px] border-[1px] border-[#dadce0]">
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
        <div className="w-[204px] flex items-center">
          <Link to={document.link}>
            <div className="flex items-center">
              {document.type === "doc" ? (
                <img
                  className="h-6 w-6"
                  src={"/src/client/assets/icons/documents/icon-doc.svg"}
                  alt="doc"
                />
              ) : (
                <img
                  className="h-6 w-6"
                  src={"/src/client/assets/icons/documents/icon-pdf.svg"}
                  alt="pdf"
                />
              )}
              <p className="text-[12px] ml-1 mr-7">{document.date}.</p>
            </div>
          </Link>
          <img
            onClick={openBubbleMenu}
            className="h-6 w-6 cursor-pointer"
            src="/src/client/assets/icons/general/icon-more.svg"
            alt="more"
          />
        </div>
      </div>
      {isBubbleMenuOpen && (
        <BubbleMenu
          setIsOpen={setBubbleMenuOpen}
          data={document}
          top={bubbleMenuY}
          left={bubbleMenuX}
          items={bubbleMenuItems}
          width={"264"}
        />
      )}
    </div>
  );
}
export default DocumentCard;
