import { Link, Outlet, useLocation } from "react-router-dom";

function Profile() {
  // const location = useLocation().pathname;
  // location.search("documents");
  return (
    <>
      <Outlet />
    </>
  );
}

export default Profile;
