import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavoriteMovies, getFavoriteTv } from '../../../store/slices/favoriteSlice';

import { IMG_ROOT } from '../../../constants/api';
import { AiOutlineUser } from 'react-icons/ai';

import style from './user.module.scss';

const User = () => {
  const { data, isAuth } = useSelector(state => state.auth);
  const { results } = useSelector(state => state.favorite);

  const dispatch = useDispatch();

  const imgUrl = data && data.avatar.tmdb.avatar_path;
  const username = data && data.username;
  const conutry = data && data.iso_3166_1;
  const account_id = data && data.id;

  const trigger = results.res;

  useEffect(() => {
    if (account_id) {
      dispatch(getFavoriteTv({account_id}))
      dispatch(getFavoriteMovies({account_id}))
    }
  }, [dispatch, account_id, trigger]);

  return (
    <>
      {
        isAuth &&
          <div className={style.wrapp}>
            <div className={style.image}>
              {
                imgUrl 
                  ? <img src={`${IMG_ROOT}/w500${imgUrl}`} alt="User avatar"/>
                  : <AiOutlineUser />
              }  
            </div>

            <div className={style.info}>
              <p>{username && username[0].toUpperCase() + username.slice(1)}</p>
              <span>{conutry}</span>
            </div>
          </div>
      }
    </>
  );
}

export default User;