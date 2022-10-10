import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.scss';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const { user, logoutUser } = useAuthContext();
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
          {user ? (
            <NavLink
              to='/edituser'
              className={({ isActive }) => (isActive ? style.activeStyle : undefined)}
            >
              <li className={style.list}>Profile</li>
            </NavLink>
          ) : (
            <NavLink
              to='/signup'
              className={({ isActive }) => (isActive ? style.activeStyle : undefined)}
            >
              <li className={style.list}>Sign Up</li>
            </NavLink>
          )}
          {user ? (
            <li className={style.list} onClick={() => logoutUser()}>
              Log out
            </li>
          ) : (
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? style.activeStyle : undefined)}
            >
              <li className={style.list}>Log in</li>
            </NavLink>
          )}
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
