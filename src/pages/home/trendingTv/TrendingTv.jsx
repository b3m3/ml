import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTrendingTvShows } from '../../../store/slices/trendingSlice';
import TrendingCardTv from './trendingCardTv/TrendingCardTv';
import Loading from '../../../components/loading/Loading';
import Error from '../../../components/error/Error';

import style from './trending-tv.module.scss';

const TrendingTv = () => {
  const dispatch = useDispatch();

  const { trendingTvShows } = useSelector(state => state.trending);

  useEffect(() => {
    dispatch(fetchTrendingTvShows())
  }, [dispatch]);

  return (
    <div className={style.wrapp}>
      <h3>Tv shows</h3>
        
      {
        trendingTvShows.res &&
          <ul className={style.tvShows}>
            {
              trendingTvShows.res?.results?.slice(0, 10).map(props => {
                return (
                  <li key={props.id}>
                    <TrendingCardTv {...props} />
                  </li>
                )
              })
            }
          </ul>
      }

      { trendingTvShows.loading && <Loading /> }

      {
        trendingTvShows.status && 
          <Error status={trendingTvShows.status?.message} />
      }
    </div>
  );
}

export default TrendingTv;