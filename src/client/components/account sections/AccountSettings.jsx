import Input from "./Input";

function AccountSettings() {
  return (
    <div>
      <div className="w-[590px] h-[150px] mb-10 border-2 px-7 border-black flex items-center">
        <img
          className="w-[88px] h-[88px] border-2 border-black"
          src="src/client/assets/icons/tamplates/icon-plus.svg"
          alt="avatar"
        />
        <div className="ml-5 mr-20">
          <span className="mb-1 text-xl ">Upload a New Photo</span>
          <p className="text-xs tracking-[5%]">Profie-pic.jpg</p>
        </div>
        <div className="w-[100px] h-[45px] bg-black text-sm text-white flex items-center justify-center cursor-pointer">
          Update
        </div>
      </div>
      <div className="w-[590px] flex flex-wrap gap-[18px]">
        <form className="w-[590px] flex flex-wrap gap-[18px]" action="">
          <Input placeholder={"Full name"} width={"286px"} />
          <Input placeholder={"Email Address"} width={"286px"} />
          <Input placeholder={"Adress"} width={"590px"} />
          <Input placeholder={"City"} width={"286px"} />
          <Input placeholder={"State/Province"} width={"286px"} />
          <Input placeholder={"Zip Code"} width={"286px"} />
          <Input placeholder={"Country"} width={"286px"} />
          <Input placeholder={"Phone number"} width={"286px"} />
          <Input placeholder={"Date of birth"} width={"286px"} />
          <Input placeholder={"Adress"} width={"590px"} />
          <Input placeholder={"Office address"} width={"286px"} />
          <Input placeholder={"Place of work "} width={"286px"} />
          <Input placeholder={"Work Zip Code"} width={"286px"} />
          <Input placeholder={"Passport No."} width={"286px"} />
          <button className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center">
            UPDATE INFORMATION
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;
