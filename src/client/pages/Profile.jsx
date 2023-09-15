import AccountSettings from "../components/account sections/AccountSettings";

function Profile() {
  return (
    <>
      <header className="w-[980px] h-12 mb-12 flex flex-row justify-between items-center border-b-2 border-solid border-black">
        <img
          className="h-7"
          src="src/client/assets/icons/logo/logo-header.png"
          alt="Logo"
        />
        <nav>
          <ul className="flex flex-row gap-20">
            <li className="text-sm cursor-pointer">About</li>
            <li className="text-sm cursor-pointer">Documentation</li>
            <li className="text-sm cursor-pointer">Documents</li>
            <li className="text-sm cursor-pointer  bg-black text-white leading-7">
              Profile
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex gap-[62px]">
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
        <AccountSettings />
      </main>
    </>
  );
}

export default Profile;
