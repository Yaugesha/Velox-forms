import React, { createContext, useContext, useState } from "react";
import * as API from "../api/applicationsAPI";

const ApplicationsContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState({});
  const [currentApplications, setCurrentApplications] = useState({});
  const [category, setCategory] = useState();
  const [title, setTitle] = useState("");
  const [referenceFile, setReferenceFile] = useState(null);
  const [comment, setComment] = useState("");

  const saveApplication = async () => {
    const { application } = await API.submitAplication(
      referenceFile,
      category,
      title,
      comment
    );
    setApplications([...applications, application]);
  };
  const findApplications = async () => {
    const userApplications = await API.findApplications();
    setApplications(userApplications);
  };
  const findApplication = async (applicationId) => {
    const application = await API.findApplication(applicationId);
    setApplication(application);
  };
  const findAllApplications = async () => {
    const applications = await API.findAllApplications();
    setApplications(applications);
  };
  const deleteApplication = async (applicationId) => {
    const { message, status } = await API.deleteApplication(applicationId);
    if (status)
      setApplications([
        ...applications.filter((application) => {
          return application.id !== applicationId;
        }),
      ]);
    return { isRecieved: true, status: status, message: message };
  };
  const editApplication = async (application) => {
    const { message, status } = await API.editApplication(application);
    return { isRecieved: true, status: status, message: message };
  };
  const changeStatus = async (applicationId, name, comment) => {
    if (comment.length === 0)
      return {
        isRecieved: true,
        status: false,
        message: "You must comment your action",
      };
    const { message, status } = await API.changeStatus(
      applicationId,
      name,
      comment
    );
    if (status)
      setApplications(
        applications.map((application) => {
          console.log(application.id, applicationId);
          if (application.id != applicationId) return application;
          else {
            application.statuses.at(-1).name = name;
            application.statuses.at(-1).comment = comment;
            console.log(application);
            return application;
          }
        })
      );
    return { isRecieved: true, status: status, message: message };
  };

  const value = {
    applications,
    application,
    referenceFile,
    setReferenceFile,
    category,
    currentApplications,
    setCurrentApplications,
    setCategory,
    title,
    setTitle,
    comment,
    setComment,
    saveApplication,
    findAllApplications,
    findApplications,
    findApplication,
    deleteApplication,
    editApplication,
    changeStatus,
  };
  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  return context;
}
