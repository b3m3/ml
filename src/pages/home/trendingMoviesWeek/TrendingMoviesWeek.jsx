import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTrendingMoviesWeek } from '../../../store/slices/trendingSlice';
import Poster from '../../../components/poster/Poster';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';

import { AiFillStar, AiFillLike } from 'react-icons/ai';

import style from './trending-movies-week.module.scss';

const TrendingMoviesWeek = () => {
  const dispatch = useDispatch();

  const { trendingMoviesWeek } = useSelector(state => state.trending)

  useEffect(() => {
    dispatch(fetchTrendingMoviesWeek())
  }, [dispatch]);

  return (
    <>
      {
        trendingMoviesWeek.res &&
          <div className={style.wrapp}>
            <h5>Trending week movies</h5>

            <ul>
              {
                trendingMoviesWeek.res?.results?.slice(0, 6).map(({ id, poster_path, vote_average, vote_count, title }) => {
                  return (
                    <li key={id}>
                      <Link to={`/movie/${id}`}>
                        <Poster url={poster_path} size={'w185'} />
                      </Link>

                      <div className={style.body}>
                        <h5>{title && title}</h5>
                        
                        <div className={style.row}>
                          {
                            vote_average &&
                              <p>{vote_average?.toString().slice(0, 3)} <AiFillStar /></p>
                          }
                          {
                            vote_count &&
                              <p>{vote_count} <AiFillLike /></p>
                          }
                        </div>
                      </div>

                    </li>
                  )
                })
              }
            </ul>
          </div>
      }

      { trendingMoviesWeek.loading && <Loading /> }

      {
        trendingMoviesWeek.status && 
          <Error status={trendingMoviesWeek.status?.message} />
      }
    </>
  );
}

export default TrendingMoviesWeek;