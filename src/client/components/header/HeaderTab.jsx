import { NavLink } from "react-router-dom";

function HeaderTab({ name, link }) {
  
  return (
    <li className="text-sm cursor-pointer">
        <NavLink to={link}>{name}</NavLink>
    </li>
  );
}

export default HeaderTab;
