import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Episodes from './episodes/Episodes';
import Trailers from '../../components/trailers/Trailers';

import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchTvSeason } from '../../store/slices/tvShowSlice';

import style from './tv-season.module.scss';

const TvSeason = () => {
  const dispatch =  useDispatch();
  const { tvSeason } = useSelector(state => state.tvShow);
  const { id, season_number } = useParams();

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchTvSeason({ id, season_number }));
  }, [dispatch, id, season_number]);

  if (tvSeason.loading) {
    return <Loading />
  }

  if (tvSeason.status) {
    return <Error status={tvSeason.status.message} />
  }

  console.log(tvSeason);

  return (
    <section className={style.wrapp}>
      {
        tvSeason.res &&
        <>
          <div className={style.left}>
            <Poster url={tvSeason.res.poster_path} size={'original'} />
          </div>

          
          <div className={style.right}>
            <h1>{tvSeason.res.name}</h1>

            <ul className={style.info}>
              <li>Tv show</li>
              <li>{season_number === '0' ? 'Special' : `Season ${season_number}`}</li>

              {
                tvSeason.res.air_date && <li>{tvSeason.res.air_date.slice(0, 4)}</li>
              }
            </ul>
            
            {
              tvSeason.res.overview && 
                <div className={style.overview}>
                  <h5>Overview</h5>
                  <p>{tvSeason.res.overview}</p>
                </div>
            }
            
            <Trailers id={id} season_number={season_number} />
            <Episodes episodes={tvSeason.res.episodes} />
          </div>
        </>
      }
    </section>
  );
}

export default TvSeason;