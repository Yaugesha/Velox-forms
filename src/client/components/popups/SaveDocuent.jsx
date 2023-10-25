import { useEffect } from "react";
import Input from "../account sections/Input";

function SaveDocuent({ setIsOpen }) {
  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      onClick={(e) => handleClose(e)}
      className="fixed top-0 left-0 right-0 z-2 w-full h-full flex items-center bg-[#414141] bg-opacity-60"
    >
      <div className="relative w-full flex justify-center">
        <div className="relative w-[540px] h-[594px] pt-16 pb-12 bg-white flex items-center flex-col">
          <Input placeholder={"Document name"} width={"285px"} />
          <fieldset className="w-[285px] flex flex-col justify-start border-2 pl-2 border-black my-4">
            <legend>Type of document</legend>
            <div>
              <input
                className="w-4 accent-black"
                name="type"
                id="type-doc"
                type="radio"
              />
              <label htmlFor="ype-doc">.doc</label>
            </div>
            <div>
              <input
                className="w-4 accent-black"
                name="type"
                id="type-pdf"
                type="radio"
              />
              <label tmlFor="ype-doc">.pdf</label>
            </div>
          </fieldset>
          <div className="w-[285px] flex justify-start items-center gap-4 mb-4">
            <input
              className="w-6 h-6 accent-black"
              type="checkbox"
              id="template-chbox"
            />
            <label htmlFor="template-chbox">
              Save template of this document
            </label>
          </div>
          <Input placeholder={"Template roup"} width={"285px"} />
          <div className="w-[285px] flex justify-center items-center gap-4 mt-8">
            <input
              className="w-6 h-6 accent-black"
              type="checkbox"
              id="export-chbox"
            />
            <label htmlFor="export-chbox">Export this document</label>
          </div>
          <button className="bg-black w-[204px] h-8 mt-4 text-white text-base">
            Confirm and save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveDocuent;
