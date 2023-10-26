import { Link } from "react-router-dom";

function TemplateCard({ picture, title, description, link }) {
  return (
    <Link to={link}>
      <div>
        <div className="flex justify-center items-center mb-2.5 w-[180px] h-[233px] border-[1px] border-[#dadce0] pointer">
          <img src={picture} alt="template photo" />
        </div>
        <div className="font-medium">{title}</div>
        <div className="text-[#5f6368]">{description}</div>
      </div>
    </Link>
  );
}

export default TemplateCard;