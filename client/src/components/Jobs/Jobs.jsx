import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import style from './Jobs.module.scss';
import { FcCalendar } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
const Jobs = () => {
  const { jobs, deleteSingleJob } = useAuthContext();
  let navigate = useNavigate();

  return (
    <div className={style.grid}>
      {jobs?.map((job, index) => {
        const { _id: jobId } = job;
        return (
          <div className={style.container}>
            <div className={style.content}>
              <p className={style.job}>
                {job.position} at {job.company}
              </p>
              <div className={style[`${job.status}`]}>{job.status}</div>
              <div className={style.date}>
                <i>
                  <FcCalendar />
                </i>
                <span>{job.date.split('T')[0]}</span>
              </div>
            </div>
            <div className={style.bottom}>
              <span className={style.edit} onClick={() => navigate(`/editjob/${index}`)}>
                Edit
              </span>{' '}
              <span className={style.delete} onClick={() => deleteSingleJob({ jobId })}>
                Delete
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Jobs;
