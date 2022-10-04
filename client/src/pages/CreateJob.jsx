import { useState, useEffect } from "react";
import axios from "../APIs/endpoint";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  company: yup.string().required("Company is required!"),
  position: yup.string().required("Position is required!"),
  date: yup.string().required("date is required!"),
});

const CreateJob = () => {
  const [data, error, loading, axiosFetch] = useAxiosFetch();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    console.log(data);
  };

  return (
    <>
      <h1>Create Job</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.company?.message}</p>
        <label htmlFor="company">Company</label>
        <input
          {...register("company")}
          type="text"
          placeholder="Company"
          id="company"
        />
        <p>{errors.position?.message}</p>
        <label htmlFor="position">Position</label>
        <input
          {...register("position")}
          type="text"
          placeholder="Position"
          id="position"
        />
        <p>{errors.date?.message}</p>
        <label htmlFor="date">date</label>
        <input
          {...register("date")}
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          id="date"
        />
        <label htmlFor="status">Select function</label>
        <select
          name="status"
          {...register("Status", {
            required: "select one option",
          })}
        >
          <option value="Pending" />
          <option value="Pending">Pending</option>
          <option value="Interview">Interview</option>
          <option value="Declined">Declined</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default CreateJob;
