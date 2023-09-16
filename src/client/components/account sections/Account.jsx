import { Link, Outlet } from "react-router-dom";
import Header from "../documents/Header";

function Account() {
  return (
    <>
      <Header isAuthorized={true} page={"Profile"} />
      <main className="flex gap-[62px] mt-12">
        <div className="flex flex-col gap-2.5">
          <div className="w-[328px] h-[78px] pt-3.5 pb-4 pl-7 bg-black text-white">
            <span className="text-[20px]">Account Settings</span>
            <p className="text-xs">Data for forms</p>
          </div>
          <div className="w-[328px] h-[78px] pt-3.5 pb-5 pl-7 border-2 border-black">
            <span className="text-[20px]">Account Settings</span>
            <p className="text-[#5F5F5F] text-xs">Data for forms</p>
          </div>
          <div className="w-[328px] h-[78px] pt-3.5 pb-5 pl-7 border-2 border-black">
            <span className="text-[20px]">Password & Security</span>
            <p className="text-[#5F5F5F]] text-xs">
              Details about your personal information
            </p>
          </div>
          <div className="w-[328px] h-[78px] pt-3.5 pb-5 pl-7 border-2 border-black">
            <span className="text-[20px]">Sign out</span>
            <p className="text-[#5F5F5F]] text-xs">
              Exit from your account on this device
            </p>
          </div>
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default Account;
