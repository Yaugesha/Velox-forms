import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Applications() {
  const [path, setPath] = useState("history");
  return (
    <div>
      <div className="flex justify-around pb-10">
        <Link to="history">
          <div
            onClick={() => setPath("history")}
            className={`${
              path === "history" && "bg-black text-white"
            } text-xl border-2 border-black px-4`}
          >
            History
          </div>
        </Link>
        <Link to="create">
          <div
            onClick={() => setPath("create")}
            className={`${
              path === "create" && "bg-black text-white"
            } text-xl border-2 border-black px-4`}
          >
            Create application
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Applications;
