import { Link } from 'react-router-dom';

import Poster from '../../../../components/poster/Poster';

import style from './card-upcoming.module.scss';

const CardUpcoming = ({ id, poster_path, title, release_date }) => {
  return (
    <Link 
      className={style.wrapp}
      to={`/movie/${id}`}
    >
      <div className={style.top}>
        <Poster url={poster_path} size={'w300'} />
      </div>

      <span>{ release_date?.split('-').reverse().join('.') }</span>

      <div className={style.body}>
        <p>Movie</p>
        <h5>{title && title}</h5>
      </div>
    </Link>
  );
}

export default CardUpcoming;