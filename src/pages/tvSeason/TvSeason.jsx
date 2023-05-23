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
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import GeneralInfoList from '../../components/generalInfoList/GeneralInfoList';
import Overview from '../../components/overview/Overview';

const TvSeason = () => {
  const dispatch =  useDispatch();
  const { tvSeason } = useSelector(state => state.tvShow);
  const { id, season_number } = useParams();

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchTvSeason({ id, season_number }));
  }, [dispatch, id, season_number]);

  if (tvSeason.loading) {
    return <Loading page />
  }

  if (tvSeason.status) {
    return <Error status={tvSeason.status.message} page />
  }

  return (
    <section className={style.wrapp}>
      {
        tvSeason.res &&
        <>
          <div className={style.left}>
            <Poster url={tvSeason.res.poster_path} size={'original'} />
          </div>
          
          <div className={style.right}>
            <Breadcrumb />

            <h1>{tvSeason.res.name}</h1>

            <GeneralInfoList 
              title="Tv show"
              season_number={season_number}
              air_date={tvSeason.res.air_date}
            />
            
            <Overview overview={tvSeason.res.overview} />
            <Trailers id={id} season_number={season_number} />
            <Episodes episodes={tvSeason.res.episodes} />
          </div>
        </>
      }
    </section>
  );
}

export default TvSeason;