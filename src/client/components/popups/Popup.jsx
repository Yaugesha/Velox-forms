import { useEffect } from "react";

function Popup({ children, width, height, handleClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      onClick={(e) => handleClose(e)}
      className="fixed top-0 left-0 right-0 z-2 w-full h-full flex items-center bg-[#414141] bg-opacity-60"
    >
      <div className="relative w-full flex justify-center">
        <div
          className="relative pt-16 pb-12 bg-white flex items-center flex-col"
          style={{ width: width, height: height }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
