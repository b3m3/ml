import { Link } from 'react-router-dom';
import style from './trending-card-tv.module.scss';
import Poster from '../../../../components/poster/Poster';

const TrendingCardTv = ({ id, backdrop_path, name }) => {
  return (
    <div className={style.wrapp}>
      <Link to={`/tv/${id}`}>
        <Poster url={backdrop_path} size={'w500'} />
        <p>{name && name}</p>
      </Link>
    </div>
  );
}

export default TrendingCardTv;