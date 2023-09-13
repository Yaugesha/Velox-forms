function Document({ picture, title, date, type, link }) {
  return (
    <div className="mb-2.5 w-[225px] h-[340px] border-[1px] border-[#dadce0]">
      <div className="flex justify-center items-center w-[225px] h-[260px] border-b-[1px]">
        <img src={picture} alt="document" />
      </div>
      <div className="pt-4 pb-5 pl-4">
        <span>
          {title}.{type}
        </span>
        <div className="flex justify-start items-center ">
          {type === "doc" ? (
            <img
              src={"src/client/assets/icons/documents/icon-doc.svg"}
              alt="doc"
            />
          ) : (
            <img
              src={"src/client/assets/icons/documents/icon-pdf.svg"}
              alt="pdf"
            />
          )}
          <p>{date}.</p>
          <button>
            <img
              src="src/client/assets/icons/general/icon-more.svg"
              alt="more"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
{
  /* <Document
        title={"Document name"}
        type={"doc"}
        date={"13 September 2023y"}
        picture={"src/client/assets/icons/tamplates/icon-plus.svg"}
      />*/
}
export default Document;
