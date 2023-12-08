import { Outlet, NavLink } from "react-router-dom";

function Applications() {
  return (
    <div>
      <div className="container mx-auto pb-10">
        <div className="flex space-x-4">
          <NavLink
            to="history"
            className={({ isActive }) =>
              `text-xl border-2 border-black px-4 ${
                isActive
                  ? "bg-black text-white"
                  : " duration-500 hover:bg-black hover:text-white"
              } `
            }
          >
            History
          </NavLink>
          <NavLink
            to="create"
            className={({ isActive }) =>
              `text-xl border-2 border-black px-4 ${
                isActive
                  ? "bg-black text-white"
                  : " duration-500 hover:bg-black hover:text-white"
              } `
            }
          >
            Create application
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Applications;
