import { useSelector } from 'react-redux';
import { IMG_ROOT } from '../../../constants/api';

import style from './user.module.scss';

const User = () => {
  const { data, isAuth } = useSelector(state => state.auth);

  const imgUrl = data && data.avatar.tmdb.avatar_path;
  const username = data && data.username;
  const conutry = data && data.iso_3166_1;

  return (
    <>
      {
        isAuth &&
          <div className={style.wrapp}>
            <div className={style.image}>
              <img src={imgUrl && `${IMG_ROOT}/w500${imgUrl}`} alt="User avatar"/>
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