import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TrendingCardTv from './trendingCardTv/TrendingCardTv';
import { fetchTrendingTvShows } from '../../../store/slices/trendingSlice';
import style from './trending-tv.module.scss';

const TrendingTv = () => {
  const dispatch = useDispatch();

  const { trendingTvShows } = useSelector(state => state.trending);

  useEffect(() => {
    dispatch(fetchTrendingTvShows())
  }, [dispatch]);

  return (
    <>
      {
        trendingTvShows.res &&
          <div className={style.wrapp}>
            <h3>Tv shows</h3>
              
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
        </div>
      }
    </>
  );
}

export default TrendingTv;