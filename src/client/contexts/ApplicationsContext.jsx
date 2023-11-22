import React, { createContext, useContext, useState } from "react";
import * as API from "../api/applicationsAPI";

const ApplicationsContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [currentApplications, setCurrentApplications] = useState({});
  const [category, setCategory] = useState();
  const [title, setTitle] = useState("");
  const [referenceFile, setReferenceFile] = useState(null);
  const [comment, setComment] = useState("");

  const findApplications = async () => {
    const userApplications = await API.findApplications();
    setApplications(userApplications);
  };
  const deleteApplication = async (applicationId) => {
    const { message, status } = await API.deleteApplication(applicationId);
    console.log(message);
    return { isRecieved: true, status: status, message: message };
  };
  const editApplication = async (application) => {
    const { message, status } = await API.editApplication(application);
    console.log(message);
    return { isRecieved: true, status: status, message: message };
  };

  const value = {
    applications,
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
    findApplications,
    deleteApplication,
    editApplication,
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
