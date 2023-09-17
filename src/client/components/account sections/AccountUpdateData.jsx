import Input from "./Input";

function AccountUpdateData() {
  return (
    <div>
      <form
        className="w-[590px] flex flex-wrap justify-between gap-[18px] mb-12"
        action=""
      >
        <Input placeholder={"Email"} width={"590px"} id={"email"} />
        <Input placeholder={"Password"} width={"590px"} id={"password"} />
        <button className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center">
          CHANGE EMAIL
        </button>
      </form>
      <form
        className="w-[590px] flex flex-wrap justify-between gap-[18px]"
        action=""
      >
        <Input
          placeholder={"Current password"}
          width={"590px"}
          id={"currentPassword"}
        />
        <Input
          placeholder={"New password"}
          width={"590px"}
          id={"newPassword1"}
        />
        <Input
          placeholder={"New password"}
          width={"590px"}
          id={"newPassword2"}
        />
        <button className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center">
          CHANGE PASSWORD
        </button>
      </form>
    </div>
  );
}

export default AccountUpdateData;
