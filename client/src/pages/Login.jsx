import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { schema } from "../models/login";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  let navigate = useNavigate();
  const { dispatch, user, loginUser, isLoading } = useAuthContext();

  const onSubmitHandler = async (data) => {
    const { email, password } = data;
    loginUser({ email, password });
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate("/dashboard");
    }
  }, [user]);

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
        <button disabled={isLoading} type="submit">
          Log In
        </button>
      </form>
    </>
  );
};

export default Login;
