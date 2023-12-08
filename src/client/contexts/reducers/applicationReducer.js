export function reducer(state, action) {
  switch (action.type) {
    case "applications/getUser":
      return {
        ...state,
        applications: action.payload,
      };
    case "applications/getAll":
      return {
        ...state,
        applications: action.payload,
      };
    case "application/get":
      return {
        ...state,
        application: action.payload,
      };
    case "application/save":
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    case "application/delete":
      return {
        ...state,
        applications: state.applications.filter((application) => {
          return application.id !== action.payload;
        }),
      };
    case "application/changeStatus":
      return {
        ...state,
        applications: state.applications.map((application) => {
          if (application.id != action.payload.applicationId)
            return application;
          else {
            return {
              ...application,
              statuses: [
                {
                  name: action.payload.name,
                  comment: action.payload.comment,
                  date: new Date().toLocaleDateString("en-us", dateOptions),
                },
                ...application.statuses,
              ],
            };
          }
        }),
        application: {
          ...state.application,
          statuses: [
            ...state.application.statuses,
            {
              name: action.payload.name,
              comment: action.payload.comment,
              date: new Date().toLocaleDateString("en-us", dateOptions),
            },
          ],
        },
      };
    case "formData/set":
      return {
        ...state,
        ...(state.formData[action.payload.field] = action.payload.value),
      };
    case "formData/restore":
      return {
        ...state,
        formData: {},
      };
  }
}

const dateOptions = {
  month: "long",
  day: "numeric",
  year: "numeric",
};
