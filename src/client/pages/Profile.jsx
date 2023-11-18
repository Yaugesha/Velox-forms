import { Link, Outlet, useLocation } from "react-router-dom";
import ProfileNavigationTab from "../components/profile-sections/ProfileNavigationTab";
import Header from "../components/header/Header";

function Profile() {
  const location = useLocation();
  const tab = location.pathname.split("/").at(-1);
  // const location = useLocation().pathname;
  // location.search("documents");
  return (
    <>
      <Header role={"user"} page={"Profile"} />
      <main className="flex gap-[62px] mt-12">
        <div className="flex flex-col gap-2.5">
          <ProfileNavigationTab
            path={tab}
            title={"Account Settings"}
            subtitle={"Data for forms"}
            link={"settings"}
          />
          <ProfileNavigationTab
            path={tab}
            title={"Template applications"}
            subtitle={"Your applications for creating templates"}
            link={"applications"}
          />
          <ProfileNavigationTab
            path={tab}
            title={"Password & Security"}
            subtitle={"Details about your personal information"}
            link={"security&password"}
          />
          <ProfileNavigationTab
            path={tab}
            title={"Sign out"}
            subtitle={"Exit from your account on this device"}
            link={"signOut"}
          />
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default Profile;
