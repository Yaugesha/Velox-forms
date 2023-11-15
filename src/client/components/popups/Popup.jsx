import { useEffect } from "react";

function Popup({ children, handleClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      onClick={(e) => handleClose(e)}
      className="fixed top-0 left-0 right-0 z-2 w-full h-full flex items-center bg-[#414141] bg-opacity-60"
    >
      <div className="relative w-full flex justify-center">{children}</div>
    </div>
  );
}

export default Popup;
