import { useState } from "react";
import BubbleMenu from "../modals/bubble-menus/BubbleMenu";
import { Link } from "react-router-dom";

function DocumentList({ document }) {
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
    <div className="w-[980px] h-[50px] flex items-center border-b-2 border-bl">
      <Link to={document.link}>
        <div className="w-[956px] flex items-center">
          {document.type === "doc" ? (
            <img
              className="h-6 w-6  mx-3.5"
              src={"/src/client/assets/icons/documents/icon-doc.svg"}
              alt="doc"
            />
          ) : (
            <img
              className="h-6 w-6  mx-3.5"
              src={"/src/client/assets/icons/documents/icon-pdf.svg"}
              alt="pdf"
            />
          )}
          <span className="w-[70%] mx-3.5 inline-flex items-center font-medium">
            {document.title}
          </span>
          <span className="mr-8 flex items-center leading-5 font-medium">
            {document.date}
          </span>
        </div>
      </Link>
      <img
        onClick={openBubbleMenu}
        className="h-6 w-6 cursor-pointer"
        src="/src/client/assets/icons/general/icon-more.svg"
        alt="more"
      />
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

export default DocumentList;
