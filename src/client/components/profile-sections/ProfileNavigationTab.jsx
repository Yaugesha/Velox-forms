import { NavLink } from "react-router-dom";

function ProfileNavigationTab({ title, subtitle, link }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `w-[328px] h-[78px] pt-3.5 pb-4 pl-7 ${
          isActive
            ? "bg-black text-white"
            : "border-2 border-black duration-500 hover:bg-black hover:text-white"
        } `
      }
      to={link}
    >
      <span className="text-[20px]">{title}</span>
      <p className="text-[#5F5F5F] text-xs">{subtitle}</p>
    </NavLink>
  );
}

export default ProfileNavigationTab;
