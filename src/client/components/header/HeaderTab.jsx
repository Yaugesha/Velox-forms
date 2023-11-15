import { NavLink } from "react-router-dom";

function HeaderTab({ name, link }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) => [
          "text-sm cursor-pointer",
          isActive && " py-1 px-1 bg-black text-white leading-7",
        ]}
        to={link}
      >
        {name}
      </NavLink>
    </li>
  );
}

export default HeaderTab;
