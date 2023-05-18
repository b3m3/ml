import { Link } from 'react-router-dom';

import Poster from '../../../../components/poster/Poster';

import style from './card-upcoming.module.scss';

const CardUpcoming = ({ id, poster_path, title }) => {
  return (
    <Link 
      className={style.wrapp}
      to={`/movie/${id}`}
    >
      <div className={style.top}>
        <Poster url={poster_path} size={'w300'} />
      </div>

      <div className={style.body}>
        <h5>Movie</h5>
        <h3>{title && title}</h3>
      </div>
    </Link>
  );
}

export default CardUpcoming;