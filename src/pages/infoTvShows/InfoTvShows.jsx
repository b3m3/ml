import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchDataByid } from '../../store/slices/fetchDataSlice';

import Cast from '../../components/cast/Cast';
import Trailers from '../../components/trailers/Trailers';
import Recommendations from '../../components/recommendations/Recommendations';
import Reviews from '../../components/reviews/Reviews';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SocialLinks from '../../components/socialLinks/SocialLinks';
import SeasonsList from './seasonsList/SeasonsList';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Overview from '../../components/overview/Overview';
import Rating from '../../components/rating/Rating';
import Votes from '../../components/votes/Votes';
import Genres from '../../components/genres/Genres';
import GeneralInfoList from '../../components/generalInfoList/GeneralInfoList';
import FavoriteBtn from '../../components/favoriteBtn/FavotireBtn';

import style from './info-tv-shows.module.scss';

const InfoTvShows = () => {
  const dispatch =  useDispatch();
  const { info } = useSelector(state => state.fetchData);
  const { isAuth } = useSelector(state => state.auth);
  const { id } = useParams();

  const params = { type: 'tv', id };

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchDataByid({ type: 'tv', id }));
  }, [dispatch, id]);

  if (info.loading) {
    return <Loading page />
  }

  if (info.status) {
    return <Error status={info.status.message} page />
  }

  return (
    <section className={style.wrapp}>
      {
        info.res &&
          <>
            <div className={style.left}>
              <Poster url={info.res.backdrop_path} size={'original'} />
              { isAuth && <FavoriteBtn /> }
            </div>

            <div className={style.right}>
              <Breadcrumb />

              <h1>{info.res.original_name}</h1>

              <GeneralInfoList 
                title="Tv show"
                production_countries={info.res.production_countries}
                status={info.res.status}
                first_air_date={info.res.first_air_date}
                episode_run_time={info.res.episode_run_time}
              />

              <SocialLinks {...params} />
              <Genres genres={info.res.genres} />
              
              <div className={style.row}>
                <Rating vote_average={info.res.vote_average} />
                <Votes vote_count={info.res.vote_count} />
              </div>

              <Cast {...params} />
              <Trailers {...params} />
              <SeasonsList seasons={info.res.seasons} tvId={id} />
              <Overview overview={info.res.overview} />
              <Recommendations {...params} />
              <Reviews {...params} />
            </div>
          </>
      }
    </section>
  );
}

export default InfoTvShows;