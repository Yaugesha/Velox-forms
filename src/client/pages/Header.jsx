import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Header({ isAuthorized, page }) {
  function addActive() {
    document.querySelectorAll(".text-sm.cursor-pointer").forEach((el) => {
      if (el.textContent === page) {
        el.classList.add("bg-black");
        el.classList.add("text-white");
        el.classList.add("leading-7");
      }
    });
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
          <li className={`text-sm cursor-pointer`}>About</li>
          <li className={`text-sm cursor-pointer`}>Documentation</li>
          {isAuthorized ? (
            <>
              <li className={`text-sm cursor-pointer`}>
                <NavLink to="../documents">Documents</NavLink>
              </li>
              <li className="text-sm cursor-pointer">
                <NavLink to="../account/settings">Profile</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="signIn">Sign In</NavLink>
              </li>
              <li className="cursor-pointer bg-black text-white h-7 text-sm">
                <NavLink to="signUp">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
