import { useEffect, useState } from "react";
import { useApplications } from "../../../contexts/ApplicationsContext";

function ApplicationsHistory() {
  const { applications, findApplications } = useApplications();

  useEffect(function () {
    findApplications();
  }, []);

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
                className="h-14 border-b-2 cursor-pointer"
              >
                <td className=" border-none">{application.data.name}</td>
                <td className=" border-none">{application.date}</td>
                <td className=" border-none">
                  {application.statuses[application.statuses.length - 1].name}
                </td>
                <td className=" border-none">
                  <img
                    className="h-6 w-6 cursor-pointer"
                    src="/src/client/assets/icons/general/icon-more.svg"
                    alt="more"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsHistory;
History;
