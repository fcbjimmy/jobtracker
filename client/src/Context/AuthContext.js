import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { reducer } from "./reducer";

export const AuthContext = createContext();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    token: token ? token : null,
    jobs: [],
  });

  console.log("AuthContext state: ", state);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state?.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        toast.error("Authentication error 401", { position: "top-center" });
      }
      return Promise.reject(error);
    }
  );

  const setUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      dispatch({ type: "SETUP_USER_BEGIN" });
      const { data } = await authFetch.post("/auth/register", {
        name,
        email,
        password,
      });
      const { user, token } = data;
      dispatch({
        type: "SETUP_USER_SUCCESS",
        payload: { name: user.name, email: user.email, token },
      });
      setUserToLocalStorage({ token, user });
      toast.success("User created", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data}`, { position: "top-center" });
      dispatch({
        type: "SETUP_USER_ERROR",
      });
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      dispatch({ type: "SETUP_USER_BEGIN" });
      const { data } = await authFetch.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = data;
      console.log(data);
      dispatch({
        type: "SETUP_USER_SUCCESS",
        payload: { name: user.name, email: user.email, token },
      });
      setUserToLocalStorage({ token, user });
      toast.success("Logged in", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data}`, { position: "top-center" });
      dispatch({
        type: "SETUP_USER_ERROR",
      });
    }
  };

  const logoutUser = () => {
    dispatch({
      type: "LOGOUT",
    });
    removeUserFromLocalStorage();
    toast.success("User logged out", { position: "top-center" });
  };

  const allJobs = async () => {
    try {
      dispatch({ type: "SETUP_JOB_BEGIN" });
      const { data } = await authFetch.get("/jobs");
      const { jobs } = data;
      dispatch({ type: "GET_JOBS", payload: jobs });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data}`, { position: "top-center" });
    }
  };

  const createJob = async ({ data }) => {
    try {
      dispatch({ type: "SETUP_JOB_BEGIN" });
      const { data: dataReceived } = await authFetch.post("/jobs", { ...data });
      dispatch({ type: "GET_JOBS" });
      toast.success(`${dataReceived.msg}`, { position: "top-center" });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "SETUP_USER_ERROR",
      });
    }
  };

  const editSingleJob = async ({ data, jobId, id }) => {
    console.log(data, jobId);
    try {
      dispatch({ type: "SETUP_EDIT_BEGIN" });
      const response = await authFetch.patch(`/jobs/updateJob/${jobId}`, {
        ...data,
      });
      toast.success(`${response?.data?.msg}`, { position: "top-center" });
      dispatch({ type: "SETUP_EDIT_SUCCESS" });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSingleJob = async ({ jobId }) => {
    console.log("job state: ", state.jobs);
    try {
      dispatch({ type: "SETUP_DELETE_BEGIN" });
      const response = await authFetch.delete(`/jobs/${jobId}`);
      const filteredJobs = state.jobs.filter((job) => job._id !== jobId);
      console.log(filteredJobs);
      dispatch({ type: "SETUP_DELETE_SUCCESS", payload: filteredJobs });
      toast.success(`${response?.data?.msg}`, { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  const editUserInfo = async ({ data }) => {
    try {
      dispatch({ type: "USER_EDIT_BEGIN" });
      const { data: userData } = await authFetch.patch("/user/updateUser", {
        ...data,
      });
      console.log(userData);
      const { token, user } = userData;
      setUserToLocalStorage({ token, user });
      dispatch({
        type: "USER_EDIT_SUCCESS",
        payload: { name: user.name, email: user.email, token },
      });
      toast.success(`${userData?.msg}`, { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        registerUser,
        loginUser,
        logoutUser,
        createJob,
        editSingleJob,
        deleteSingleJob,
        allJobs,
        editUserInfo,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
