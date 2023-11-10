function DocumentList({ picture, title, date, type, link }) {
  return (
    <div className="w-[980px] h-[50px] flex items-center border-b-2 border-bl">
      {type === "doc" ? (
        <img
          className="h-6 w-6  mx-3.5"
          src={"/src/client/assets/icons/documents/icon-doc.svg"}
          alt="doc"
        />
      ) : (
        <img
          className="h-6 w-6  mx-3.5"
          src={"/src/client/assets/icons/documents/icon-pdf.svg"}
          alt="pdf"
        />
      )}
      <span className="w-[70%] mx-3.5 inline-flex items-center font-medium">
        {title}
      </span>
      <span className="mr-8 flex items-center leading-5 font-medium">
        {date}
      </span>
      <img
        className="h-6 w-6 cursor-pointer"
        src="/src/client/assets/icons/general/icon-more.svg"
        alt="more"
      />
    </div>
  );
}

export default DocumentList;
