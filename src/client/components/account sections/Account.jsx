import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import AccountNavigationTab from "./AccountNavigationTab";

function Account() {
  const location = useLocation();
  const tab = location.pathname.split("/").at(-1);

  return (
    <>
      <Header role={"user"} page={"Profile"} />
      <main className="flex gap-[62px] mt-12">
        <div className="flex flex-col gap-2.5">
          <AccountNavigationTab
            path={tab}
            title={"Account Settings"}
            subtitle={"Data for forms"}
            link={"settings"}
          />
          <AccountNavigationTab
            path={tab}
            title={"Template applications"}
            subtitle={"Your applications for creating templates"}
            link={"applications"}
          />
          <AccountNavigationTab
            path={tab}
            title={"Password & Security"}
            subtitle={"Details about your personal information"}
            link={"security&password"}
          />
          <AccountNavigationTab
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

export default Account;
