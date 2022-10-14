import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import jobAnimation from '../../animations/job.json';
import { Button } from '../index.js';
import style from './Hero.module.scss';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const anime = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: jobAnimation,
    });
    return () => instance.destroy();
  }, []);

  return (
    <section className={style.section}>
      <div className={style.description}>
        <h1>
          Track Your <br /> Job Applications
        </h1>
        <p>
          App built using React, CSS and SASS in the front-end, <br />
          while using Express and MongoDB in the back-end.
        </p>

        <span onClick={() => navigate('/login')}>
          <Button>Login/Signup</Button>
        </span>

        <span>
          By&nbsp;
          <a href='https://github.com/fcbjimmy/jobtracker' rel='noreferrer' target='_blank'>
            Jimmy
          </a>
          &nbsp;😎
        </span>
      </div>
      <div className={style.animation} ref={anime}></div>
    </section>
  );
};

export default HeroSection;
