import { useState, useEffect } from "react";
import ResultModal from "../modals/ResultModal";
import Input from "../custom-elements/Input";

function ProfileSettings() {
  const [personalUserData, setPersonalUserData] = useState({
    fullName: "",
    email: "",
    country: "",
    countrySubdivision: "",
    city: "",
    adress: "",
    zipCode: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [workUserData, setWorkUserData] = useState({
    officeAdress: "",
    placeOfWork: "",
    workPhoneNumber: "",
    workZipCode: "",
    workEmail: "",
  });
  const [result, setResult] = useState(null);

  const handleInputPersonalData = (e) => {
    const { id, value } = e.target;
    setPersonalUserData({
      ...personalUserData,
      [id]: value,
    });
  };

  const handleInputWorkData = (e) => {
    const { id, value } = e.target;
    setWorkUserData({
      ...workUserData,
      [id]: value,
    });
  };

  useEffect(function () {
    const jwt = localStorage.getItem("jwt");
    const getUserData = async () => {
      const response = await fetch("/api/v1/users/personal-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Bearer: jwt,
        },
      });
      const result = await response.json();

      if (response.status !== 200) {
        throw Error(result.message);
      }
      if (result.userData.personal)
        setPersonalUserData(result.userData.personal);
      if (result.userData.work) setWorkUserData(result.userData.work);
    };

    getUserData();
  }, []);

  async function saveData() {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("/api/v1/users/save-personal-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Bearer: jwt,
      },
      body: JSON.stringify({
        userData: {
          personalData: personalUserData,
          workData: workUserData,
        },
      }),
    });
    const result = await response.json();
    if (response.status !== 200) {
      throw Error(result.message);
    }
    setResult(result.message);
  }

  return (
    <div>
      <div className="w-[590px] h-[150px] mb-10 border-2 px-7 border-black flex flex-col justify-evenly items-start">
        <p className="mb-1 text-xl ">Enter your information</p>
        <p>
          This information will be used in the templates you are about to
          complete. The program automatically analyzes data from the database
          and autofills fields with the same labels.
        </p>
      </div>
      <div className="w-[590px] flex justify-between flex-wrap " action="">
        <div className="grid grid-rows-4 grid-cols-2 gap-[18px] mb-[18px]">
          {/* {Object.keys(userData).map((key) => {
            <Input
              //defaultValue={userData.key}
              handleInput={dispatch}
              state={userData}
              width={"286px"}
              id={key}
            />;
          })} */}
          <Input
            defaultValue={personalUserData.fullName}
            handleInput={handleInputPersonalData}
            placeholder={"Full name"}
            width={"286px"}
            id={"fullName"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.email}
            handleInput={handleInputPersonalData}
            placeholder={"Email Address"}
            width={"286px"}
            id={"email"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.adress}
            handleInput={handleInputPersonalData}
            placeholder={"Adress"}
            width={"590px"}
            colSpan={"col-span-2"}
            id={"adress"}
            span={true}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.city}
            handleInput={handleInputPersonalData}
            placeholder={"City"}
            width={"286px"}
            id={"city"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.countrySubdivision}
            handleInput={handleInputPersonalData}
            placeholder={"Country Subdivision"}
            width={"286px"}
            id={"countrySubdivision"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.zipCode}
            handleInput={handleInputPersonalData}
            placeholder={"Zip Code"}
            width={"286px"}
            id={"zipCode"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.country}
            handleInput={handleInputPersonalData}
            placeholder={"Country"}
            width={"286px"}
            id={"country"}
            withLabel={true}
          />
        </div>
        <div className="grid grid-rows-4 grid-cols-2 gap-[18px] mb-[18px]">
          <Input
            defaultValue={personalUserData.phoneNumber}
            handleInput={handleInputPersonalData}
            placeholder={"Phone number"}
            width={"286px"}
            id={"phoneNumber"}
            withLabel={true}
          />
          <Input
            defaultValue={personalUserData.dateOfBirth}
            handleInput={handleInputPersonalData}
            placeholder={"Date of birth"}
            width={"286px"}
            id={"dateOfBirth"}
            withLabel={true}
          />
          <Input
            defaultValue={workUserData.officeAdress}
            handleInput={handleInputWorkData}
            placeholder={"Office adress"}
            width={"590px"}
            colSpan={"col-span-2"}
            id={"officeAdress"}
            span={true}
            withLabel={true}
          />
          <Input
            defaultValue={workUserData.placeOfWork}
            handleInput={handleInputWorkData}
            placeholder={"Place of work "}
            width={"286px"}
            id={"placeOfWork"}
            withLabel={true}
          />
          <Input
            defaultValue={workUserData.workPhoneNumber}
            handleInput={handleInputWorkData}
            placeholder={"Work phone number"}
            width={"286px"}
            id={"workPhoneNumber"}
            withLabel={true}
          />
          <Input
            defaultValue={workUserData.workZipCode}
            handleInput={handleInputWorkData}
            placeholder={"Work Zip Code"}
            width={"286px"}
            id={"workZipCode"}
            withLabel={true}
          />
          <Input
            defaultValue={workUserData.workEmail}
            handleInput={handleInputWorkData}
            placeholder={"Work email"}
            width={"286px"}
            id={"workEmail"}
            withLabel={true}
          />
        </div>
        <button
          onClick={saveData}
          className="w-[590px] h-[45px] bg-black text-sm text-white flex items-center justify-center"
        >
          UPDATE INFORMATION
        </button>
      </div>
      {result && <ResultModal message={result} setMessage={setResult} />}
    </div>
  );
}

export default ProfileSettings;
