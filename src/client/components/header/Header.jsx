import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HeaderTab from "./HeaderTab";

function Header() {
  const { role, checkIsUserAuthorized } = useAuth();

  const [tabs, setTabs] = useState([]);

  useEffect(
    function () {
      // checkIsUserAuthorized();
      switch (role) {
        case "user":
          setTabs([
            { name: "About", link: "/" },
            { name: "Documentation", link: "/" },
            { name: "Documents", link: "/documents" },
            { name: "Profile", link: "/profile" },
          ]);
          break;
        case "admin":
          setTabs([
            { name: "Templates", link: "" },
            { name: "Users", link: "" },
            { name: "Profile", link: "" },
          ]);
          break;
        default:
          setTabs([
            { name: "About", link: "" },
            { name: "Documentation", link: "" },
            { name: "Sign In", link: "signIn" },
            { name: "Sign Up", link: "signUp" },
          ]);
          break;
      }
    },
    [role]
  );

  return (
    <header className="w-[980px] h-12 flex flex-row justify-between items-center border-b-2 border-solid border-black">
      <Link to="../../">
        <img
          className="h-7"
          src="/src/client/assets/icons/logo/logo-header.png"
          alt="Logo"
        />
      </Link>
      <nav>
        <ul className="flex flex-row gap-20">
          {tabs.map((tab) => {
            return <HeaderTab name={tab.name} link={tab.link} key={tab.name} />;
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
