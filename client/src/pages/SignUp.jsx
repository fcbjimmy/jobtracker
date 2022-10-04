import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../APIs/endpoint";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { schema } from "../models/signup";

const SignUp = () => {
  const [response, error, loading, axiosFetch] = useAxiosFetch();
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    const { confirmPassword, name, email, password } = data;

    axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/auth/register",
      requestConfig: {
        name,
        email,
        password,
      },
    });
  };

  if (error?.response?.status === 400) {
    toast.error(`${error?.response?.data}`, { position: "top-center" });
  }

  if (response?.status === 201) {
    toast.success("User created", { position: "top-center" });
    navigate("/dashboard");
    reset();
  }

  // console.log(error?.response?.data);

  // const onSubmitHandler = async (data) => {
  //   // console.log(JSON.stringify(data));
  //   const { confirmPassword, name, email, password } = data;
  //   try {
  //     const response = await axios.post("/auth/register", {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   reset();
  // };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.name?.message}</p>
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="name" id="name" placeholder="name" />
        <p>{errors.email?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="email"
        />
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="min 6 characters"
        />
        <p>{errors.confirmPassword?.message}</p>
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm Password"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
