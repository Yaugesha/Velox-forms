import { useEffect } from "react";
import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import { useApplications } from "../../../contexts/ApplicationsContext";
import Popup from "../Popup";

function ActionModal({ children }) {
  const { bubbleMenu, close } = useBubbleMenu();
  const { restoreFormData } = useApplications();
  const modalName = bubbleMenu.name;

  useEffect(function () {
    const bubbleMenu = document.querySelector(".container-bubble-menu");
    if (bubbleMenu) bubbleMenu.classList.add("hidden");
  }, []);

  function handleClose(e) {
    if (
      e.target.classList.contains("popup-container") ||
      e.target.classList.contains("exit-btn")
    ) {
      document.body.style.overflow = "auto";
      const bubbleMenu = document.querySelector(".container-bubble-menu");
      close();
      if (modalName === "edit") {
        restoreFormData();
      }
      if (bubbleMenu) {
        bubbleMenu.classList.remove("hidden");
      }
    }
  }

  return <Popup handleClose={handleClose}>{children}</Popup>;
}

export default ActionModal;
