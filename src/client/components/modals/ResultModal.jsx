import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Button from "../custom-elements/Button";

function ResultModal({ message, setMessage, page }) {
  const navigate = useNavigate();
  const handleClose = (e) => {
    if (
      e.target.classList.contains("popup-container") ||
      e.target.classList.contains("close-btn")
    ) {
      document.body.style.overflow = "auto";
      setMessage(false);
      if (page === "application") navigate("../history");
    }
  };

  return (
    <Popup handleClose={handleClose}>
      <div className="w-[500px] h-[180px] flex flex-col justify-center items-center bg-white">
        <p className="text-xl mb-8 text-center">{message}</p>
        <Button callback={handleClose} name={"Close"} clas={"close-btn"} />
      </div>
    </Popup>
  );
}

export default ResultModal;
