import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import style from './Jobs.module.scss';
import { FcCalendar, FcBriefcase } from 'react-icons/fc';
const Jobs = () => {
  const { jobs } = useAuthContext();

  return (
    <div className={style.grid}>
      {jobs?.map((job, index) => {
        console.log(job.date);
        return (
          <div className={style.container}>
            <div className={style.content}>
              <p className={style.job}>
                {job.position} at {job.company}
              </p>
              <div className={style.status}>{job.status}</div>
              <div className={style.date}>
                <i>
                  <FcCalendar />
                </i>
                <span>{job.date.split('T')[0]}</span>
              </div>
            </div>
            <div className={style.bottom}>
              <span className={style.edit}>Edit</span> <span className={style.delete}>Delete</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Jobs;
