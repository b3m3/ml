import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchDataByid } from '../../store/slices/fetchDataSlice';

import Poster from '../../components/poster/Poster';
import Cast from '../../components/cast/Cast';
import Trailers from '../../components/trailers/Trailers';
import Recommendations from '../../components/recommendations/Recommendations';
import Reviews from '../../components/reviews/Reviews';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SocialLinks from '../../components/socialLinks/SocialLinks';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import GeneralInfoList from '../../components/generalInfoList/GeneralInfoList';
import Genres from '../../components/genres/Genres';
import Rating from '../../components/rating/Rating';
import Votes from '../../components/votes/Votes';
import Overview from '../../components/overview/Overview';
import FavoriteBtn from '../../components/favoriteBtn/FavotireBtn';

import style from './info-movie.module.scss';

const InfoMovie = () => {
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.fetchData);
  const { isAuth } = useSelector(state => state.auth);
  const { id } = useParams();

  const params = { type: 'movie', id };

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchDataByid({ type: 'movie', id }));
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

            <h1>{info.res.title}</h1>

            <GeneralInfoList 
              title="Movie"
              production_countries={info.res.production_countries}
              status={info.res.status}
              release_date={info.res.release_date}
              runtime={info.res.runtime}
            />

            <SocialLinks {...params} />
            <Genres genres={info.res.genres} />

            <div className={style.row}>
              <Rating vote_average={info.res.vote_average} />
              <Votes vote_count={info.res.vote_count} />
            </div>

            <Cast {...params} />
            <Trailers {...params} />
            <Overview overview={info.res.overview} />
            <Recommendations {...params} />
            <Reviews {...params} />
          </div>
        </>
      }
    </section>
  );
}

export default InfoMovie;