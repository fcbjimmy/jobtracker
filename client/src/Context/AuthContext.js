import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { authReducer } from "./authReducer";

export const AuthContext = createContext();

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: user ? JSON.parse(user) : null,
    isLoading: false,
    token: token,
  });
  console.log("AuthContext state: ", state);

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
      const { data } = await axios.post("/api/v1/auth/register", {
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
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(data);
      const { token, user } = data;
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

  const logoutUser = async () => {
    dispatch({
      type: "LOGOUT",
    });
    removeUserFromLocalStorage();
    toast.success("User logged out", { position: "top-center" });
    console.log("logout");
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
