import { useNavigate } from "react-router-dom";

function DocumentHeader({ width, position, page, navButtons, handleCLick }) {
  const navigate = useNavigate();

  return (
    <header
      className={`${position} w-[${width}] flex mb-4 border-b-2 bg-white border-solid border-black`}
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
      <div className="flex self-center w-30 h-8 gap-2">
        {navButtons !== undefined
          ? navButtons.map((button, index) => {
              return (
                <div
                  className="flex self-center cursor-pointer"
                  key={index}
                  onClick={() => handleCLick({ name: button.alt })}
                >
                  <img src={button.image} alt={button.alt} />
                </div>
              );
            })
          : ""}
      </div>
    </header>
  );
}

export default DocumentHeader;
