import { useEffect } from "react";
import axios from "../APIs/endpoint";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const [response, error, loading, axiosFetch] = useAxiosFetch();
  const { user, dispatch } = useAuthContext();
  let navigate = useNavigate();

  // const fetchData = async () => {
  //   axiosFetch({
  //     axiosInstance: axios,
  //     method: "get",
  //     url: "/user/showCurrentUser",
  //   });
  // };

  // useEffect(() => {
  //   if (!user) {
  //     fetchData();
  //   }
  //   return () => {};
  // }, [user]);

  // if (response.status === 200) {
  //   dispatch({ type: "LOGIN", payload: response.data.user });
  // }

  const handleLogout = async () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "/auth/logout",
    });
  };

  console.log(response);

  if (response?.data?.isLogged === false) {
    toast.success(`${response?.data?.message}`, { position: "top-center" });
    navigate("/");
  }

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get("auth/logout", {
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //     if (response?.data?.isLogged === false) {
  //       toast.success(`${response?.data?.message}`, { position: "top-center" });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div>Dashboard</div>
      <h1>Welcome {user?.userToken?.name}</h1>
      <button onClick={handleLogout}>Log out</button>
      <h2 onClick={() => navigate("/createjob")}>Create Job</h2>
    </>
  );
};

export default Dashboard;
