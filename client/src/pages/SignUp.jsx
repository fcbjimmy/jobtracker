import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { schema } from "../models/signup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { user, registerUser, isLoading } = useAuthContext();

  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    const { confirmPassword, name, email, password } = data;
    registerUser({ name, email, password });
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate("/dashboard");
    }
  }, [user]);

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
        <button disabled={isLoading} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
