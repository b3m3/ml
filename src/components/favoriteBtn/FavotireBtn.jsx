import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postFavorite } from '../../store/slices/favoriteSlice';
import { getTypeFromPathname } from '../../utils/functions';

import style from './favorite-btn.module.scss';

const FavoriteBtn = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [animation, setAnimation] = useState(false);

  const { id } = useParams();
  const { favoriteMovies, favoriteTv } = useSelector(state => state.favorite);
  const { data, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const type = getTypeFromPathname();

  const handleClick = () => {
    // Animation
    setIsFavorite(a => !a);
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);

    // Post
    if (isAuth) {
      const doc = { type, id, account_id: data.id, bool: !isFavorite}
      dispatch(postFavorite(doc));
    }
  }
  
  useEffect(() => {
    const currentArray = type === 'movie' ? favoriteMovies : favoriteTv;
    const chechFavorite = currentArray.res?.map(el => el.id === +id ? true : '').join('');
    
    setIsFavorite(Boolean(chechFavorite));
  }, [favoriteMovies, favoriteTv, id, type]);

  const scvClass = `${style.svg} ${animation ? style.play : null} ${isFavorite ? style.isFavorite : null}`;
  
  return (
    <button 
      className={style.wrapp}
      onClick={handleClick}
      >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={scvClass}
      >
        <path
          d="M4.45 13.908l6.953 6.531c.24.225.36.338.5.366a.5.5 0 00.193 0c.142-.028.261-.14.5-.366l6.953-6.53a5.203 5.203 0 00.549-6.983l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 01-.974 0C10.13 4.416 6.18 3.99 4.212 6.527l-.31.4a5.203 5.203 0 00.549 6.981z"
        />
      </svg>
    </button>
  );
}

export default FavoriteBtn;