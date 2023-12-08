import { useEffect, useState } from "react";
import { useApplications } from "../../contexts/ApplicationsContext";
import { useBubbleMenu } from "../../contexts/BubbleMenuContext";
import BubbleMenu from "../modals/bubble-menus/BubbleMenu";
import Application from "../modals/applications/Application";

function ApplicationsHistory() {
  const [application, setApplication] = useState({});
  const [isApplicationInfoOpen, setApplicationInfoOpen] = useState(false);

  const { applications, findApplications, deleteApplication, editApplication } =
    useApplications();
  const { bubbleMenu, open } = useBubbleMenu();

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
  //     name: "max size max size max size max size m 40",

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
                className="h-14 border-b-2 cursor-pointer duration-100 hover:bg-zinc-50 hover:border-none"
              >
                <td className=" border-none">{application.data.name}</td>
                <td className=" border-none">{application.date}</td>
                <td className=" border-none">
                  {application.statuses[application.statuses.length - 1].name}
                </td>
                <td className="bubble-menu-btn w-10 border-none">
                  <img
                    onClick={(e) => {
                      setApplication(application);
                      open(
                        {
                          y: e.target.getBoundingClientRect().top,
                          x: e.target.getBoundingClientRect().left,
                        },
                        application,
                        bubbleMenuItems
                      );
                    }}
                    className="bubble-menu-btn p-[6px] cursor-pointer rounded-full duration-300 hover:bg-stone-200"
                    src="/src/client/assets/icons/general/icon-more.svg"
                    alt="more"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {bubbleMenu.isOpen && <BubbleMenu />}
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
