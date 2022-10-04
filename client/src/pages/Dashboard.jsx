import { useEffect } from "react";
import axios from "../APIs/endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user, dispatch, logoutUser } = useAuthContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user]);

  // const handleLogout = async () => {
  //   axiosFetch({
  //     axiosInstance: axios,
  //     method: "get",
  //     url: "/auth/logout",
  //   });
  // };

  // console.log(response);

  // if (response?.data?.isLogged === false) {
  //   toast.success(`${response?.data?.message}`, { position: "top-center" });
  //   navigate("/");
  // }

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
      <h1>Welcome {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      <button onClick={logoutUser}>Log out</button>
      <h2 onClick={() => navigate("/createjob")}>Create Job</h2>
    </>
  );
};

export default Dashboard;
