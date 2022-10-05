export const reducer = (state, action) => {
  switch (action.type) {
    case "SETUP_USER_BEGIN":
      return { ...state, isLoading: true };
    case "SETUP_USER_ERROR":
      return { ...state, isLoading: false };
    case "SETUP_USER_SUCCESS":
      return {
        ...state,
        user: { name: action.payload.name, email: action.payload.email },
        isLoading: false,
        token: action.payload.token,
      };

    case "LOGOUT":
      return { ...state, user: null, token: null, jobs: [] };
    case "SETUP_JOB_BEGIN":
      return { ...state, isLoading: true };
    case "SETUP_JOB_ERROR":
      return { ...state, isLoading: false };
    case "GET_JOBS":
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case "CREATE_JOB":
      return {
        ...state,
        isLoading: false,
        jobs: [action.payload, ...state.jobs],
      };
    default:
      return state;
  }
};
