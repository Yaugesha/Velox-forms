import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import BubbleMenuItem from "./BubbleMenuItem";
import ActionModal from "./ActionModal";

function BubbleMenu() {
  const { bubbleMenu, close } = useBubbleMenu();

  function handleClose(e) {
    if (
      (e.target.className !== "" &&
        !e.target.className.includes("bubble-menu-item") &&
        !e.target.className.includes("bubble-menu")) ||
      e.target.className.includes("container-bubble-menu")
    )
      close();
  }

  return (
    <>
      <div
        onClick={handleClose}
        style={{ height: document.body.scrollHeight + "px" }}
        className={`container-bubble-menu absolute top-0 left-0 w-full h-full`}
      >
        <div
          style={{ top: bubbleMenu.y + "px", left: bubbleMenu.x + "px" }}
          className={`bubble-menu relative w-[${140}px] py-2 px-2 shadow-md bg-white`}
        >
          {bubbleMenu.items.map((item) => {
            return (
              <BubbleMenuItem
                key={item.name}
                data={bubbleMenu.data}
                item={item}
              />
            );
          })}
        </div>
      </div>
      {bubbleMenu.isModalOpen && <ActionModal>{bubbleMenu.modal}</ActionModal>}
    </>
  );
}

export default BubbleMenu;
