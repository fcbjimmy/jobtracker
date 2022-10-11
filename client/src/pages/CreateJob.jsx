import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../hooks/useAuthContext';
import { schema } from '../models/createJob';

const CreateJob = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user, dispatch, createJob, isLoading } = useAuthContext();

  const onSubmitHandler = async (data) => {
    createJob({ data });
    reset();
  };

  return (
    <>
      <h1>Create Job</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.company?.message}</p>
        <label htmlFor='company'>Company</label>
        <input {...register('company')} type='text' placeholder='Company' id='company' />
        <p>{errors.position?.message}</p>
        <label htmlFor='position'>Position</label>
        <input {...register('position')} type='text' placeholder='Position' id='position' />
        <p>{errors.date?.message}</p>
        <label htmlFor='date'>Date</label>
        <input
          {...register('date')}
          type='date'
          min={new Date().toISOString().slice(0, 10)}
          id='date'
        />
        <label htmlFor='status'>Status</label>
        <select
          name='status'
          {...register('Status', {
            required: 'select one option',
          })}
        >
          <option value='Pending' />
          <option value='Pending'>Pending</option>
          <option value='Interview'>Interview</option>
          <option value='Offer'>Offer</option>
          <option value='Declined'>Declined</option>
        </select>
        <button disabled={isLoading} type='submit'>
          submit
        </button>
      </form>
    </>
  );
};

export default CreateJob;
