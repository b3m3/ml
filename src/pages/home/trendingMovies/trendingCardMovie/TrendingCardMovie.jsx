import { Link } from 'react-router-dom';
import Poster from '../../../../components/poster/Poster';

import { TbUnlink } from 'react-icons/tb';

import style from './trending-card-movie.module.scss';

const TrendingCardMovie = ({ id, backdrop_path, title, release_date }) => {
  return (
    <div className={style.wrapp}>
      <Poster url={backdrop_path} size={'w1280'} />

      <div className={style.body}>
        <h1>{title && title}</h1>

        <p>{release_date && release_date.slice(0, 4)}</p>
      </div>
        <Link 
          to={`/movie/${id}`}
          className={style.link}
        >
          <TbUnlink />
        </Link>
    </div>
  );
}

export default TrendingCardMovie;