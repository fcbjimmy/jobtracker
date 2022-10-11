import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { schema } from '../models/editjob';

const EditJob = () => {
  const { user, jobs, isLoading, allJobs, editSingleJob } = useAuthContext();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: jobs ? `${jobs[id]?.company}` : '',
      position: jobs ? `${jobs[id]?.position}` : '',
      date: jobs ? `${jobs[id]?.date.split('T')[0]}` : '',
      status: jobs ? `${jobs[id]?.status}` : '',
    },
  });

  const jobId = jobs ? jobs[id]?._id : null;

  console.log(jobs);
  const onSubmitHandler = (data) => {
    editSingleJob({ data, jobId, id });
  };

  return (
    <>
      <h1>Edit Job</h1>
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
          {...register('status', {
            required: 'select one option',
          })}
        >
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

export default EditJob;
