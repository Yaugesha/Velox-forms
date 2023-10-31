import { useEffect } from "react";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
import HeaderTab from "./HeaderTab";
import { observer } from "mobx-react";

const Header = observer(({ page }) => {
  function addActive() {
    document.querySelectorAll(".text-sm.cursor-pointer").forEach((el) => {
      if (el.textContent === page) {
        el.classList.add("bg-black");
        el.classList.add("text-white");
        el.classList.add("leading-7");
      }
    });
  }

  let tabs = [];
  switch (authStore.role) {
    case "user":
      tabs = [
        { name: "About", link: "" },
        { name: "Documentation", link: "" },
        { name: "Documents", link: "/documents" },
        { name: "Profile", link: "/profile/account/settings" },
      ];
      break;
    case "admin":
      tabs = [
        { name: "Templates", link: "" },
        { name: "Users", link: "" },
        { name: "Profile", link: "" },
      ];
      break;
    default:
      tabs = [
        { name: "About", link: "" },
        { name: "Documentation", link: "" },
        { name: "Sign In", link: "signIn" },
        { name: "Sign Up", link: "signUp" },
      ];
      break;
  }
  useEffect(() => addActive(), []);
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
});

export default Header;
