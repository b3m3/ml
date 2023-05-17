import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BackBtn from '../../components/UI/backBtn/BackBtn';
import Loading from '../../components/loading/Loading';
import Logo from '../../components/logo/Logo';
import Poster from '../../components/poster/Poster';
import { fetchData } from '../../store/slices/fetchDataSlice';
import { fetchSession, fetchToken, fetchValidate, fetchAuth } from '../../store/slices/authSlice';

import style from './login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, status, token, validate, isAuth } = useSelector(state => state.auth);
  const { data } = useSelector(state => state.fetchData);
  
  const isCheckedStyle = {background: 'var(--blue-400)', border: '2px solid #fff'}
  const disabledStyle = {opacity: '.65', pointerEvents: 'none'}
  const isValue = username.length > 3 && password.length > 5;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchToken());
  };

  useEffect(() => {
    dispatch(fetchData({type: 'movie', category: 'popular', page: 1}))
  }, [dispatch])

  useEffect(() => {
    if (token) {
      const doc = { username, password, request_token: token };
      dispatch(fetchValidate(doc))
    }
  }, [dispatch, username, password, token]);

  useEffect(() => {
    if (validate) {
      dispatch(fetchSession({ request_token: validate, remember }))
    }
  }, [dispatch, validate, remember]);
  
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchAuth());
      navigate('/');
    }
  }, [isAuth, navigate, dispatch])

  return (
    <div className={style.wrapp}>

      <BackBtn ligth />

      {
        data.res &&
          <ul className={style.background}>
            {
              data.res?.results?.slice(0, 12).map(({ id, backdrop_path }) => {
                return (
                  <li key={id}>
                    <Poster url={backdrop_path} size={'w500'} />
                  </li>
                )
              })
            }
          </ul>
      }

      <div className={style.body}>
        <div className={style.logo}>
          <Logo />
        </div>

        {
          status && <p className={style.status}>{status}</p>
        }

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.row}>
            <label htmlFor="username">User name</label>
            <input
              type="text" 
              name="username" 
              id="username"
              placeholder="Enter your user name"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className={style.row}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={style.row}>
            <span 
              onClick={() => setRemember(c => !c)}
              style={remember ? isCheckedStyle : null}
            />
            <input
              type="checkbox" 
              name="checkbox" 
              id="checkbox"
              value={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <label htmlFor="checkbox">Remember me</label>
          </div>

          <div className={style.row}>
              {
                loading 
                  ? <Loading />
                  : <button type="submit" style={!isValue ? disabledStyle : null}>Sign in</button>
              }
          </div>

          <div className={style.row}>
            <span>Don't have an account ? </span>
            <a href="https://www.themoviedb.org/signup" target="__blank">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;