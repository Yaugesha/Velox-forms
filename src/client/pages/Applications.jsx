import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useApplications } from "../contexts/ApplicationsContext";
import Header from "../components/header/Header";
import Footer from "../components/footers/Footer";
import Application from "../components//modals/applications/Application";

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
  }, []);
  const location = useLocation();

  return (
    <>
      {location.pathname.split("/")[2] !== undefined ? (
        <Outlet />
      ) : (
        <div className="min-h-full flex flex-col">
          <Header />
          <main className="w-full flex flex-auto flex-col items-center">
            <div className="w-[980px] container mx-auto pt-8">
              <h2 className="text-2xl font-bold mb-4">Applications Requests</h2>
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
                        if (!e.target.classList.contains("process-btn")) {
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
                      <td className=" border-none">
                        {application.data.category}
                      </td>
                      <td className=" border-none">{application.data.name}</td>
                      <td className=" border-none">
                        {application.data.fileRoute}
                      </td>
                      {application.statuses.at(-1).name !== "Complited" && (
                        <td align="end" className="border-none">
                          <Link
                            to={`processing?applicationId=${application.id}`}
                          >
                            <button className="process-btn bg-black text-white px-2">
                              Process
                            </button>
                          </Link>
                        </td>
                      )}
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
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Applications;
