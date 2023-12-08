import { useState } from "react";
import SignOut from "../modals/auth/SignOut";
import DeleteAccount from "../modals/auth/DeleteAccount";
import Button from "../custom-elements/Button";

function ProfileExit() {
  const [isSignOut, setSignOut] = useState(false);
  const [isDelete, setDelete] = useState(false);
  return (
    <div>
      <div className="w-[590px] flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-xl">Exit from your account</p>
          <p>
            You will be asked to verify your identity next time you sign in.
          </p>
          <Button
            name={"Sign out"}
            callback={() => setSignOut(true)}
            clas={"w-[128px]"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl">Delete your account</p>
          <p>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            name={"Delete account"}
            callback={() => setDelete(true)}
            clas={"w-[168px]"}
          />
        </div>
        {isSignOut && <SignOut setIsOpen={setSignOut} />}
        {isDelete && <DeleteAccount setIsOpen={setDelete} />}
      </div>
    </div>
  );
}

export default ProfileExit;
