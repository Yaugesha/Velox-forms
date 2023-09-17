import { Link } from "react-router-dom";

function AccountNavigationTab({ path, title, subtitle, link }) {
  return (
    <Link to={link}>
      <div
        className={`w-[328px] h-[78px] pt-3.5 pb-4 pl-7 ${
          path === link ? "bg-black text-white" : "border-2 border-black"
        } `}
      >
        <span className="text-[20px]">{title}</span>
        <p className="text-[#5F5F5F] text-xs">{subtitle}</p>
      </div>
    </Link>
  );
}

export default AccountNavigationTab;
