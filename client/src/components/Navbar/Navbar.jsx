import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.scss';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from '../../hooks/useWindowSize';

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);

  const width = useWindowSize();

  useEffect(() => {
    if (width >= 768) {
      setShowNav(true);
    } else if (width <= 767) {
      setShowNav(false);
    }
  }, [width]);

  return (
    <nav className={style.navbar}>
      <NavLink to='/'>
        <div className={style.logo}>Job Tracker</div>
      </NavLink>
      <div className={showNav ? style.navcontent : style.hidden}>
        <ul className={style.ulist}>
          <a href='https://github.com/fcbjimmy/jobtracker' rel='noreferrer' target='_blank'>
            <li className={style.list}>Source Code</li>
          </a>
          <NavLink
            to='/signup'
            className={({ isActive }) => (isActive ? style.activeStyle : undefined)}
          >
            <li className={style.list}>Sign Up</li>
          </NavLink>
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? style.activeStyle : undefined)}
          >
            <li className={style.list}>Log in</li>
          </NavLink>
        </ul>
      </div>
      {!showNav ? (
        <FiMenu onClick={() => setShowNav(!showNav)} className={style.menu} />
      ) : (
        <AiOutlineClose onClick={() => setShowNav(!showNav)} className={style.menu} />
      )}
    </nav>
  );
};

export default Navbar;
