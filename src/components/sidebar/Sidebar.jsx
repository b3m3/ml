import { NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { onActivePage } from '../../store/slices/activePageSlice';
import { logout } from '../../store/slices/authSlice';

import Logo from '../logo/Logo';
import { RiMovie2Line } from 'react-icons/ri';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { BiCameraMovie, BiHomeSmile, BiLogIn, BiLogOut } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import style from './sidebar.module.scss';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuth } = useSelector(state => state.auth);
  const { isActivePage } = useSelector(state => state.activePage);

  const links = [
    {name: 'Home', path: '/', icon: <BiHomeSmile />},
    {name: 'Movies', path: `/movie`, icon: <RiMovie2Line/>},
    {name: 'Tv shows', path: '/tv', icon: <BiCameraMovie />},
    {name: 'Actors', path: '/person', icon: <BsPeople />},
    {name: 'Favorite', path: '/favorite', icon: <MdOutlineFavoriteBorder />},
  ]

  const styleHide = isActivePage ? {left: '-15.9375rem'} : null;

  const handleLogout = () => {
    if (window.confirm('Sign out ?')) {
      dispatch(logout())
    }
  }

  useEffect(() => {
    dispatch(onActivePage(false));
  }, [dispatch, location]);

  return (
    <aside 
      className={`${style.wrapp} ${isOpen ? style.open : null}`}
      style={styleHide}
    >
      <Logo />

      <button 
        className={style.call}
        onClick={() => setIsOpen(a => !a)}
        style={styleHide}
      >
        {
          isOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />
        }
      </button>

      <nav className={style.navbar}>
        <p className={style.title}>Menu</p>
        <ul>
          {
            links.map(({ name, path, icon }, i) => {
              return (
                <li key={i}>
                  <NavLink
                    to={path}
                    className={({isActive}) => isActive ? style.active :  ''}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{icon}</span> 
                    <span>{name}</span>
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </nav>

      <div className={style.bottom}>
        <p className={style.title}>General</p>

        {
          isAuth
            ? <button className={style.button} onClick={handleLogout}>
                <BiLogOut />
                <span>Sign out</span>
              </button> 
            : <Link className={style.button} to={'/login'}>
                <BiLogIn />
                <span>Sign in</span>
              </Link> 
        }
      </div>
    </aside>
  );
}

export default Sidebar;