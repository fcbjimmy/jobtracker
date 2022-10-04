import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { schema } from "../models/login";
import axios from "../APIs/endpoint";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const [response, error, loading, axiosFetch] = useAxiosFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  let navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const onSubmitHandler = async (data) => {
    const { email, password } = data;

    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/auth/login",
      requestConfig: {
        email,
        password,
      },
    });
  };

  console.log(response);

  if (!loading && response?.data?.isLogged) {
    // dispatch({ type: "LOGIN", payload: response.data });
    reset();
    toast.success("Logged in", { position: "top-center" });
    navigate("/dashboard");
  }

  if (error?.response?.status === 401) {
    toast.error(`${error?.response?.data}`, { position: "top-center" });
  }

  // const onSubmitHandler = async (data) => {
  //   const { email, password } = data;
  //   try {
  //     const response = await axios.post("/api/v1/auth/login", {
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //     if (response.status === 200) {
  //       toast.success("Logged in", { position: "top-center" });
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   reset();
  // };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.email?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          id="email"
        />
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="password"
        />
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
