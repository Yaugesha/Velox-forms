import Input from "./Input";

function AccountSettings() {
  return (
    <div>
      <div className="w-[590px] h-[150px] mb-10 border-2 px-7 border-black flex items-center">
        <img
          className="w-[88px] h-[88px] border-2 border-black"
          src="/src/client/assets/icons/tamplates/icon-plus.svg"
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
      <div className="w-[590px] flex justify-between flex-wrap " action="">
        <div className="grid grid-rows-4 grid-cols-2 gap-[18px] mb-[18px]">
          <Input placeholder={"Full name"} width={"286px"} id={"fullName"} />
          <Input placeholder={"Email Address"} width={"286px"} id={"email"} />
          <Input
            placeholder={"Adress"}
            width={"590px"}
            colSpan={"col-span-2"}
            id={"adress"}
            span={true}
          />
          <Input placeholder={"City"} width={"286px"} id={"city"} />
          <Input placeholder={"State/Province"} width={"286px"} id={"state"} />
          <Input placeholder={"Zip Code"} width={"286px"} id={"zipCode"} />
          <Input placeholder={"Country"} width={"286px"} id={"country"} />
        </div>
        <div className="grid grid-rows-4 grid-cols-2 gap-[18px] mb-[18px]">
          <Input
            placeholder={"Phone number"}
            width={"286px"}
            id={"phoneNumber"}
          />
          <Input
            placeholder={"Date of birth"}
            width={"286px"}
            id={"dateOfBirth"}
          />
          <Input
            placeholder={"Office adress"}
            width={"590px"}
            colSpan={"col-span-2"}
            id={"officeAdress"}
            span={true}
          />
          <Input
            placeholder={"Place of work "}
            width={"286px"}
            id={"placeOfWork"}
          />
          <Input
            placeholder={"Work phone number"}
            width={"286px"}
            id={"workPhoneNumber"}
          />
          <Input
            placeholder={"Work Zip Code"}
            width={"286px"}
            id={"workZipCode"}
          />
          <Input
            placeholder={"Passport No."}
            width={"286px"}
            id={"passwordNo"}
          />
        </div>
        <button className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center">
          UPDATE INFORMATION
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
