import React, { useState, useEffect } from "react";
import { useApplications } from "../contexts/ApplicationsContext";
import Header from "../components/header/Header";
import Application from "../components/profile-sections/applications/Application";

function Applications() {
  const [application, setApplication] = useState({});
  const [isApplicationInfoOpen, setApplicationInfoOpen] = useState(false);
  const { applications, findAllApplications } = useApplications();
  // const [requests, setRequests] = useState([]);
  // const [sortedRequests, setSortedRequests] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortOrder, setSortOrder] = useState("asc");

  useEffect(function () {
    findAllApplications();
    console.log(applications);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-4">Applications Requests</h1>
        <div className="mb-4 flex items-center"></div>
        <table className="w-[980px] border-none">
          <thead>
            <tr>
              <th align="start" className="font-bold border-none">
                User ID
              </th>
              <th align="start" className="font-bold border-none">
                Submission Date
              </th>
              <th align="start" className="font-bold border-none">
                Status
              </th>
              <th align="start" className="font-bold border-none">
                Category
              </th>
              <th align="start" className="font-bold border-none">
                Title
              </th>
              <th align="start" className="font-bold border-none">
                File Link
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application.id}
                className="h-14 border-b-2 cursor-pointer"
                onClick={(e) => {
                  if (!e.target.classList.contains("bubble-menu-btn")) {
                    setApplication(application);
                    setApplicationInfoOpen(true);
                  }
                }}
              >
                <td className=" border-none">{application.userId}</td>
                <td className=" border-none">{application.date}</td>
                <td className=" border-none">
                  {application.statuses.at(-1).name}
                </td>
                <td className=" border-none">{application.data.category}</td>
                <td className=" border-none">{application.data.name}</td>
                <td className=" border-none">{application.data.fileRoute}</td>
                <td align="end" className="border-none">
                  <button className="bg-black text-white px-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isApplicationInfoOpen && (
          <Application
            application={application}
            setIsOpen={setApplicationInfoOpen}
          />
        )}
      </div>
    </>
  );
}

export default Applications;
