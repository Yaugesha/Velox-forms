function Template({ picture, title, description, link }) {
  console.log(description);
  return (
    <div>
      <div className="flex justify-center items-center mb-2.5 w-[167px] h-[216px] border-[1px] border-[#dadce0]">
        <img src={picture} alt="template photo" />
      </div>
      <div className="font-medium">{title}</div>
      <div className="text-[#5f6368]">{description}</div>
    </div>
  );
}

export default Template;
