import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingMovies } from '../../../store/slices/trendingSlice';

import TrendingCardMovie from './trendingCardMovie/TrendingCardMovie';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';

import { MdKeyboardArrowRight } from 'react-icons/md';

import style from './trending-movies.module.scss';

const TrendingMovies = () => {
  const [movieSlice, setMovieSlice] = useState(1);
  const dispatch = useDispatch();

  const maxSlides = 5;

  const { trendingMovies } = useSelector(state => state.trending)

  useEffect(() => {
    dispatch(fetchTrendingMovies())
  }, [dispatch]);

  const handleNext = () => {
    setMovieSlice(p => p === maxSlides ? 1 : p + 1)
  }

  return (
    <>
      {
        trendingMovies.res && 
          <div className={style.wrapp}>
            {
              trendingMovies.res?.results?.slice((movieSlice -1), movieSlice).map(props => {
                return (
                  <TrendingCardMovie {...props} key={props.id} />
                )
              })
            }

            <ul className={style.navigation}>
              {
                [...Array(maxSlides)].map((_, i) => {
                  return (
                    <li 
                      key={i} 
                      className={i + 1 === movieSlice ? style.active : null}
                      onClick={() => setMovieSlice(i + 1)}
                    >
                    </li>
                  )
                })
              }
            </ul>

            <i 
              className={style.next}
              onClick={handleNext}
            >
              <MdKeyboardArrowRight />
            </i>
          </div>
      }

      { trendingMovies.loading && <Loading /> }

      {
        trendingMovies.status && 
          <Error status={trendingMovies.status?.message} />
      }
    </>
  );
}

export default TrendingMovies;