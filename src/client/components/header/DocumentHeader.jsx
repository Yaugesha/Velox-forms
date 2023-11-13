import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DocumentHeader({
  children,
  width,
  position,
  page,
  navButtons,
  handleCLick,
}) {
  const navigate = useNavigate();

  useEffect(function () {
    const buttons = document.querySelectorAll(".editor-mode-btn");
    buttons.forEach((button) =>
      button.addEventListener("click", (e) => {
        buttons.forEach((button) =>
          button.firstChild.classList.remove("invert")
        );
        if (e.target.alt) e.target.classList.add("invert");
        else e.target.firstChild.classList.add("invert");
      })
    );
  }, []);

  return (
    <header
      className={`${position} w-[${width}] flex justify-between mb-4 border-b-2 bg-white border-solid border-black z-10`}
    >
      <div className="flex items-center text-base leading-6 ">
        <div
          onClick={() => navigate(-1)}
          className="inline-block items-center w-12 cursor-pointer mr-5 ml-3 p-3 font-bold leading-7 text-2xl text-black font-serif"
        >
          &larr;
        </div>
        <span className="mr-2 pt-2">{page}</span>
      </div>
      <div className="flex self-center w-30 h-8 ">
        {navButtons !== undefined &&
          navButtons.map((button, index) => {
            return (
              <div
                className="w-8 h-8 flex self-center cursor-pointer editor-mode-btn border-2 border-black"
                key={index}
                onClick={() => handleCLick(button.alt)}
              >
                <img src={button.image} alt={button.alt} />
              </div>
            );
          })}
      </div>
      {children}
    </header>
  );
}

export default DocumentHeader;
