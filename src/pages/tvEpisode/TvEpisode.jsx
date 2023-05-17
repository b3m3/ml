import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchTvEpisode } from '../../store/slices/tvShowSlice';
import { AiFillStar, AiFillLike } from 'react-icons/ai';

import style from './tv-episode.module.scss';
import Trailers from '../../components/trailers/Trailers';
import Cast from '../../components/cast/Cast';

const TvEpisode = () => {
  const dispatch =  useDispatch();
  const { tvEpisode } = useSelector(state => state.tvShow);
  const { id, season_number, episode_number } = useParams();

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchTvEpisode({ id, season_number, episode_number }));
  }, [dispatch, id, season_number, episode_number]);

  if (tvEpisode.loading) {
    return <Loading page />
  }

  if (tvEpisode.status) {
    return <Error status={tvEpisode.status.message} />
  }

  return (
    <div className={style.wrapp}>
      {
        tvEpisode.res &&
        <>
          <div className={style.left}>
            <Poster url={tvEpisode.res.still_path} size={'original'} />
          </div>

          
          <div className={style.right}>
            <h1>{tvEpisode.res.name}</h1>

            <ul className={style.info}>
              <li>Tv show</li>
              <li>{season_number === '0' ? 'Special' : `Season ${season_number}`}</li>
              <li>{`Episode ${episode_number}`}</li>

              {
                tvEpisode.res.air_date && <li>{tvEpisode.res.air_date.slice(0, 4)}</li>
              }

              {
                 tvEpisode.res.runtime && <li>{tvEpisode.res.runtime}min</li>
              }
            </ul>

            <div className={style.box}>
              {
                tvEpisode.res.vote_average &&
                  <div className={style.row}>
                    <AiFillStar style={{color: 'var(--gray-400)'}} />
                    {tvEpisode.res.vote_average.toString().slice(0, 3)}
                  </div>
              }
              {
                tvEpisode.res.vote_count &&
                  <div className={style.row}>
                    <AiFillLike style={{color: 'var(--gray-400)'}} />
                    {tvEpisode.res.vote_count}
                  </div>
              }
            </div>

            <Cast id={id} season_number={season_number} episode_number={episode_number} />
            <Trailers id={id} season_number={season_number} episode_number={episode_number} />
            
            {
              tvEpisode.res.overview && 
                <div className={style.overview}>
                  <h5>Overview</h5>
                  <p>{tvEpisode.res.overview}</p>
                </div>
            }
          </div>
        </>
      }
    </div>
  );
}

export default TvEpisode;