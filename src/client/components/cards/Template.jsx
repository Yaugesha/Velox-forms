function Template({ picture, title, description, link }) {
  return (
    <div>
      <div className="flex justify-center items-center mb-2.5 w-[144px] h-[186px] border-[1px] border-[#dadce0]">
        <img src={picture} alt="template photo" />
      </div>
      <span className="font-medium">{title}</span>
      <span>{description}</span>
    </div>
  );
}

export default Template;
