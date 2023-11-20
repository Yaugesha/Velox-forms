import { useState } from "react";
import BubbleMenuItem from "./BubbleMenuItem";

function BubbleMenu({ data, top, left, setIsOpen, items, width }) {
  const [modal, setModal] = useState(<div></div>);
  const [isModalOpen, setModalOpen] = useState(false);

  function handleClose(e) {
    if (
      (e.target.className !== "" &&
        !e.target.className.includes("bubble-menu-item") &&
        !e.target.className.includes("bubble-menu")) ||
      e.target.className.includes("container-bubble-menu")
    )
      setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={handleClose}
        style={{ height: document.body.scrollHeight + "px" }}
        className={`container-bubble-menu absolute top-0 left-0 w-full h-full`}
      >
        <div
          style={{ top: top + "px", left: left + "px" }}
          className={`bubble-menu relative w-[${width}px] py-2 px-2 shadow-md bg-white`}
        >
          {items.map((item) => {
            return (
              <BubbleMenuItem
                key={item.name}
                data={data}
                item={item}
                setModal={setModal}
                setModalOpen={setModalOpen}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </div>
      </div>
      {isModalOpen && modal}
    </>
  );
}

export default BubbleMenu;
