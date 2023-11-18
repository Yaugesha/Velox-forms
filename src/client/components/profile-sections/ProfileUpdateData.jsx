import { useState } from "react";
import Input from "./Input";

function ProfileUpdateData() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const callBackendAPIChangeEmail = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("/api/v1/users/change-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        jwt: jwt,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    localStorage.setItem("jwt", result.jwt);
  };

  const callBackendAPIChangePassword = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("/api/v1/users/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        jwt: jwt,
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirmation: newPasswordConfirm,
      }),
    });
    const result = await response.json();

    if (response.status !== 200) {
      throw Error(result.message);
    }
    localStorage.setItem("jwt", result.jwt);
  };

  return (
    <div>
      <div
        className="w-[590px] flex flex-wrap justify-between gap-[18px] mb-12"
        action=""
      >
        <Input
          placeholder={"Email"}
          width={"590px"}
          id={"email"}
          handleInput={setEmail}
        />
        <Input
          placeholder={"Password"}
          width={"590px"}
          id={"password"}
          handleInput={setPassword}
        />
        <button
          onClick={callBackendAPIChangeEmail}
          className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center"
        >
          CHANGE EMAIL
        </button>
      </div>
      <div
        className="w-[590px] flex flex-wrap justify-between gap-[18px]"
        action=""
      >
        <Input
          handleInput={setCurrentPassword}
          placeholder={"Current password"}
          width={"590px"}
          id={"currentPassword"}
        />
        <Input
          handleInput={setNewPassword}
          placeholder={"New password"}
          width={"590px"}
          id={"newPassword1"}
        />
        <Input
          handleInput={setNewPasswordConfirm}
          placeholder={"New password"}
          width={"590px"}
          id={"newPassword2"}
        />
        <button
          onClick={callBackendAPIChangePassword}
          className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center"
        >
          CHANGE PASSWORD
        </button>
      </div>
    </div>
  );
}

export default ProfileUpdateData;
