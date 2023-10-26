function DocumentCard({ picture, title, date, type, link }) {
  return (
    <div className="w-[225px] h-[340px] border-[1px] border-[#dadce0]">
      <div className="flex justify-center items-center w-[225px] h-[260px] border-b-[1px]">
        <img src={picture} alt="document" />
      </div>
      <div className="pt-4 pb-5 pl-4">
        <span>
          {title}.{type}
        </span>
        <div className="w-[204px] flex items-center ">
          {type === "doc" ? (
            <img
              className="h-6 w-6"
              src={"/src/client/assets/icons/documents/icon-doc.svg"}
              alt="doc"
            />
          ) : (
            <img
              className="h-6 w-6"
              src={"/src/client/assets/icons/documents/icon-pdf.svg"}
              alt="pdf"
            />
          )}
          <p className="text-[12px] ml-1 mr-7">{date}.</p>
          <img
            className="h-6 w-6 cursor-pointer"
            src="/src/client/assets/icons/general/icon-more.svg"
            alt="more"
          />
        </div>
      </div>
    </div>
  );
}
export default DocumentCard;
