import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchTvEpisode } from '../../store/slices/tvShowSlice';

import style from './tv-episode.module.scss';
import Trailers from '../../components/trailers/Trailers';
import Cast from '../../components/cast/Cast';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Rating from '../../components/rating/Rating';
import Votes from '../../components/votes/Votes';
import Overview from '../../components/overview/Overview';
import GeneralInfoList from '../../components/generalInfoList/GeneralInfoList';

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
    return <Error status={tvEpisode.status.message} page />
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
            <Breadcrumb />

            <h1>{tvEpisode.res.name}</h1>

            <GeneralInfoList 
              title="Tv show"
              season_number={season_number}
              air_date={tvEpisode.res.air_date}
              runtime={tvEpisode.res.runtime}
            />

            <div className={style.row}>
              <Rating vote_average={tvEpisode.res.vote_average} />
              <Votes vote_count={tvEpisode.res.vote_count} />
            </div>

            <Cast id={id} season_number={season_number} episode_number={episode_number} />
            <Trailers id={id} season_number={season_number} episode_number={episode_number} />
            <Overview overview={tvEpisode.res.overview} />
          </div>
        </>
      }
    </div>
  );
}

export default TvEpisode;