import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BackBtn from '../../components/UI/backBtn/BackBtn';
import { fetchSession, fetchToken, fetchValidate, fetchAuth } from '../../store/slices/authSlice';

import style from './login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, status, token, validate, isAuth } = useSelector(state => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchToken());
  };

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

      <div className={style.body}>
        <div className={style.logo}>
          MoviesLib
        </div>

        {status && status !== 'ok' && <p className={style.status}>{status}</p>}

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
            <button type="submit">
              {
                loading 
                  ? 'Load...'
                  : <span>Log in</span>
              }
            </button>
          </div>

          <div className={style.row}>
            <span>Don't have an account ? </span>
            <a href="https://www.themoviedb.org/signup" target="__blank">Sing up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;