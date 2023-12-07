import React, { createContext, useContext, useReducer } from "react";
import * as API from "../api/applicationsAPI";
import { reducer } from "./reducers/applicationReducer";

const ApplicationsContext = createContext();

const initialValue = {
  applications: [],
  application: {},
  formData: {},
};

export function ApplicationProvider({ children }) {
  const [{ applications, application, formData }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  const saveApplication = async () => {
    const { application, error, message } = await API.submitAplication(
      formData
    );
    dispatch({ type: "application/save", payload: application });
    restoreFormData();
    return { error, message };
  };
  const findApplications = async () => {
    const userApplications = await API.findApplications();
    dispatch({ type: "applications/getUser", payload: userApplications });
  };
  const findApplication = async (applicationId) => {
    const application = await API.findApplication(applicationId);
    dispatch({ type: "application/get", payload: application });
  };
  const findAllApplications = async () => {
    const applications = await API.findAllApplications();
    dispatch({ type: "applications/getAll", payload: applications });
  };
  const deleteApplication = async (application) => {
    const { message, status } = await API.deleteApplication(application.id);
    if (status)
      dispatch({ type: "application/delete", payload: application.id });
    return { isRecieved: true, status: status, message: message };
  };
  const editApplication = async (applicationId) => {
    const { message, status } = await API.editApplication({
      ...formData,
      applicationId,
    });
    restoreFormData();
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
      dispatch({
        type: "application/changeStatus",
        payload: applicationId,
      });
    return { isRecieved: true, status: status, message: message };
  };
  const updateFormData = (field, value) => {
    dispatch({ type: "formData/set", payload: { field: field, value: value } });
  };
  const restoreFormData = () => {
    dispatch({ type: "formData/restore" });
  };
  const value = {
    applications,
    application,
    formData,
    updateFormData,
    saveApplication,
    findAllApplications,
    findApplications,
    findApplication,
    deleteApplication,
    editApplication,
    changeStatus,
    restoreFormData,
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
