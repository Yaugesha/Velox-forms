import React, { createContext, useContext, useState } from "react";
import * as API from "../api/applicationsAPI";

const ApplicationsContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);

  const findApplications = async () => {
    const userApplications = await API.findApplications();
    setApplications(userApplications);
  };

  const value = { applications, findApplications };
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
