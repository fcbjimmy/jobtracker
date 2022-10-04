export const authReducer = (state, action) => {
  switch (action.type) {
    case "SETUP_USER_BEGIN":
      return { ...state, isLoading: true };
    case "SETUP_USER_ERROR":
      return { ...state, isLoading: false };
    case "SETUP_USER_SUCCESS":
      return { user: action.payload, isLoading: false };
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};
