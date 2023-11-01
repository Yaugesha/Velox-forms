import Input from "../account sections/Input";
import Popup from "./Popup";

function SaveDocuent({ setIsOpen }) {
  function handleClose(e) {
    if (e.target.classList.contains("w-full")) {
      document.body.style.overflow = "auto";
      setIsOpen(false);
    }
  }

  return (
    <Popup width={540} height={594} handleClose={handleClose}>
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
          <label htmlFor="ype-doc">.pdf</label>
        </div>
      </fieldset>
      <div className="w-[285px] flex justify-start items-center gap-4 mb-4">
        <input
          className="w-6 h-6 accent-black"
          type="checkbox"
          id="template-chbox"
        />
        <label htmlFor="template-chbox">Save template of this document</label>
      </div>
      <Input placeholder={"Template group"} width={"285px"} />
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
    </Popup>
  );
}

export default SaveDocuent;
