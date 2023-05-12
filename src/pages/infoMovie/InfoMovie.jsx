import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Poster from '../../components/poster/Poster';
import { onActivePage } from '../../store/slices/activePageSlice';
import { fetchDataByid } from '../../store/slices/fetchDataSlice';
import { AiFillStar, AiFillLike } from 'react-icons/ai';

import Cast from '../../components/cast/Cast';
import Trailers from '../../components/trailers/Trailers';
import Recommendations from '../../components/recommendations/Recommendations';
import Reviews from '../../components/reviews/Reviews';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SocialLinks from '../../components/socialLinks/SocialLinks';

import style from './info-movie.module.scss';

const InfoMovie = () => {
  const dispatch =  useDispatch();
  const { info } = useSelector(state => state.fetchData);
  const { id } = useParams();

  const params = { type: 'movie', id };

  useEffect(() => {
    dispatch(onActivePage(true));
    dispatch(fetchDataByid({ type: 'movie', id }));
  }, [dispatch, id]);

  if (info.loading) {
    return <Loading />
  }

  if (info.status) {
    return <Error status={info.status.message} />
  }

  return (
    <section className={style.wrapp}>
      {
        info.res &&
        <>
          <div className={style.left}>
            <Poster url={info.res.backdrop_path} size={'original'} />
          </div>

          
          <div className={style.right}>
            <h1>{info.res.title}</h1>
            
            <ul className={style.info}>
              <li>Movie</li>
              
              {
                info.res.production_countries?.map(({ name }, i) => (
                  <li key={i}>{name}</li>
                ))
              }

              {
                info.res.status && <li>{info.res.status}</li>
              }

              {
                info.res.release_date && <li>{info.res.release_date.slice(0, 4)}</li>
              }

              { 
                info.res.runtime && <li>{info.res.runtime}min</li>
              }
            </ul>

            <SocialLinks {...params} />

            <ul className={style.genres}>
              {
                info.res.genres?.map(({ name }, i) => {
                  return (
                    <li key={i}>{name}</li>
                  )
                })
              }
            </ul>
            
            <div className={style.box}>
              {
                info.res.vote_average &&
                  <div className={style.row}>
                    <AiFillStar style={{color: 'var(--gray-400)'}} />
                    {info.res.vote_average.toString().slice(0, 3)}
                  </div>
              }
              {
                info.res.vote_count &&
                  <div className={style.row}>
                    <AiFillLike style={{color: 'var(--gray-400)'}} />
                    {info.res.vote_count}
                  </div>
              }
            </div>
           

            <Cast {...params} />
            <Trailers {...params} />

            {
              info?.res?.overview && 
                <div className={style.overview}>
                  <h5>Overview</h5>
                  <p>{info?.res?.overview}</p>
                </div>
            }

            <Recommendations {...params} />
            <Reviews {...params} />
          </div>
        </>
      }
    </section>
  );
}

export default InfoMovie;