import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../hooks/useAuthContext';
import { schema } from '../models/createJob';
import { FormCard, Button } from '../components';
import style from '../styles/grid.module.scss';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <FormCard title={'Create Job'}>
        <form className={style.grid} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={style.labelInput}>
            <p className={style.error}>{errors.company?.message}</p>
            <label htmlFor='company'>Company</label>
            <input {...register('company')} type='text' placeholder='Company' id='company' />
          </div>
          <div className={style.labelInput}>
            <p className={style.error}>{errors.position?.message}</p>
            <label htmlFor='position'>Position</label>
            <input {...register('position')} type='text' placeholder='Position' id='position' />
          </div>
          <div className={style.labelInput}>
            <p className={style.error}>{errors.date?.message}</p>
            <label htmlFor='date'>Date</label>
            <input
              {...register('date')}
              type='date'
              min={new Date().toISOString().slice(0, 10)}
              id='date'
            />
          </div>
          <div className={style.labelInput}>
            <label htmlFor='status'>Status</label>
            <select
              className={style.dropdown}
              name='status'
              {...register('status', {
                required: 'select one option',
              })}
            >
              <option value='Pending' />
              <option value='Pending'>Pending</option>
              <option value='Interview'>Interview</option>
              <option value='Offer'>Offer</option>
              <option value='Declined'>Declined</option>
            </select>
          </div>
          <div className={style.button}>
            <Button disabled={isLoading} type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </FormCard>
    </motion.div>
  );
};

export default CreateJob;
