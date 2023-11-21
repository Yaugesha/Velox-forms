import { useEffect, useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";
import BubbleMenu from "../../modals/bubble-menus/BubbleMenu";
import Application from "./Application";

function ApplicationsHistory() {
  const [application, setApplication] = useState({});
  const [isApplicationInfoOpen, setApplicationInfoOpen] = useState(false);
  const [isBubbleMenuOpen, setBubbleMenuOpen] = useState(false);
  const [bubbleMenuX, setBubbleMenuX] = useState("");
  const [bubbleMenuY, setBubbleMenuY] = useState("");

  function openBubbleMenu(e) {
    setBubbleMenuOpen(true);
    setBubbleMenuY(e.target.getBoundingClientRect().top + 30);
    setBubbleMenuX(e.target.getBoundingClientRect().left - 240);
  }
  const { applications, findApplications, deleteApplication, editApplication } =
    useApplications();

  useEffect(function () {
    findApplications();
  }, []);

  const bubbleMenuItems = [
    {
      icon: "/src/client/assets/icons/general/icon-rename.svg",
      name: "Edit",
      action: editApplication,
    },
    {
      icon: "/src/client/assets/icons/general/icon-delete.svg",
      name: "Delete",
      action: deleteApplication,
    },
  ];

  // const applications = [
  //   { name: "Labs PVI", date: "November 18, 2023", status: "recieved" },
  //   { name: "Labs TPP", date: "November 18, 2023", status: "denied" },
  //   { name: "Labs PPD", date: "November 18, 2023", status: "accepted" },
  //   { name: "Labs EOIS", date: "November 18, 2023", status: "complited" },
  //   {
  //     name: "max size max size max size max size m 40",
  //     date: "November 18, 2023",
  //     status: "complited",
  //   },
  // ];
  return (
    <div className="w-full">
      <h1 className="text-xl pb-8">History of your applications</h1>
      <table className="w-[590px] border-none">
        <thead>
          <tr>
            <th align="start" className="font-bold border-none">
              Name
            </th>
            <th align="start" className="font-bold border-none">
              Date
            </th>
            <th align="start" className="font-bold border-none">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            return (
              <tr
                key={application.data.id}
                onClick={(e) => {
                  if (!e.target.classList.contains("bubble-menu-btn")) {
                    setApplication(application);
                    setApplicationInfoOpen(true);
                  }
                }}
                className="h-14 border-b-2 cursor-pointer"
              >
                <td className=" border-none">{application.data.name}</td>
                <td className=" border-none">{application.date}</td>
                <td className=" border-none">
                  {application.statuses[application.statuses.length - 1].name}
                </td>
                <td className="bubble-menu-btn w-6 border-none">
                  <img
                    onClick={(e) => {
                      setApplication(application);
                      openBubbleMenu(e);
                    }}
                    className="bubble-menu-btn h-6 w-6 cursor-pointer"
                    src="/src/client/assets/icons/general/icon-more.svg"
                    alt="more"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isBubbleMenuOpen && (
        <BubbleMenu
          setIsOpen={setBubbleMenuOpen}
          data={application}
          top={bubbleMenuY}
          left={bubbleMenuX}
          items={bubbleMenuItems}
          width={"264"}
        />
      )}
      {isApplicationInfoOpen && (
        <Application
          application={application}
          setIsOpen={setApplicationInfoOpen}
        />
      )}
    </div>
  );
}

export default ApplicationsHistory;
History;
