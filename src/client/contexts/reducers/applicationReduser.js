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
          if (application.id != action.payload) return application;
          else {
            application.statuses.at(-1).name = state.name;
            application.statuses.at(-1).comment = state.comment;
            return application;
          }
        }),
      };
    case "formData/set":
      return {
        ...state,
        ...(formData[action.payload.field] = action.payload.value),
      };
  }
}
