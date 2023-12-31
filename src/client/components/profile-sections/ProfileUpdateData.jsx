import { useState } from "react";
import ResultModal from "../modals/ResultModal";
import Input from "../custom-elements/Input";

function ProfileUpdateData() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [result, setResult] = useState(null);

  const callBackendAPIChangeEmail = async () => {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch("/api/v1/users/change-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Bearer: jwt,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      localStorage.setItem("jwt", result.jwt);
      setResult(result.message);
    } catch (error) {
      console.log(error.message);
      setResult(error.message);
    }
  };

  const callBackendAPIChangePassword = async () => {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch("/api/v1/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Bearer: jwt,
        },
        body: JSON.stringify({
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
      setResult(result.message);
    } catch (error) {
      console.log(error.message);
      setResult(error.message);
    }
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
          // id={"email"}
          handleInput={setEmail}
          withLabel={true}
        />
        <Input
          placeholder={"Password"}
          type={"password"}
          width={"590px"}
          // id={"password"}
          handleInput={setPassword}
          withLabel={true}
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
          type={"password"}
          width={"590px"}
          // id={"currentPassword"}
          withLabel={true}
        />
        <Input
          handleInput={setNewPassword}
          placeholder={"New password"}
          type={"password"}
          width={"590px"}
          // id={"newPassword1"}
          withLabel={true}
        />
        <Input
          handleInput={setNewPasswordConfirm}
          placeholder={"New password"}
          type={"password"}
          width={"590px"}
          // id={"newPassword2"}
          withLabel={true}
        />
        <button
          onClick={callBackendAPIChangePassword}
          className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center"
        >
          CHANGE PASSWORD
        </button>
      </div>
      {result && <ResultModal message={result} setMessage={setResult} />}
    </div>
  );
}

export default ProfileUpdateData;
