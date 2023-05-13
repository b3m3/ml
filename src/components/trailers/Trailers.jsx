import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardTrailer from './cardTrailer/CardTrailer';
import TrailerModal from './trailerModal/TrailerModal';
import { fetchTrailers, fetchTvShowEpisodeTrailers, fetchTvShowSeasonTrailers } from '../../store/slices/fetchDataSlice';

import { MdKeyboardArrowUp } from 'react-icons/md';

import style from './trailers.module.scss';

const Trailers = ({ type, id, season_number, episode_number }) => {
  const [trailersLength, setTrailersLength] = useState(4);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const dispatch =  useDispatch();
  const { trailers } = useSelector(state => state.fetchData);

  useEffect(() => {
    // Get trailers for movies or tv shows
    if (type && id && !episode_number) {
      dispatch(fetchTrailers({ type, id }));
    }

    // Get trailers for tv shows seasons
    if (season_number && id && !episode_number) {
      dispatch(fetchTvShowSeasonTrailers({ season_number, id }))
    }

    // Get trailers for tv shows episodes
    if (season_number && id && episode_number) {
      dispatch(fetchTvShowEpisodeTrailers({ season_number, episode_number, id }))
    }
  }, [dispatch, type, season_number, episode_number, id]);

  const handleOpen = (url) => {
    setTrailerUrl(url);
  }

  const handleClose = () => {
    setTrailerUrl(null);
  }
  
  const totalTrailers = trailers?.res?.results.length;

  return (
    <>
      {
        Boolean(trailers.res?.results.length) &&
        <div className={style.wrapp}>
          <h5>Trailers</h5>

          <ul>
            {
              trailers.res?.results?.slice(0, trailersLength).map((props, i) => {
                return (
                  <li key={props.id}>
                    <CardTrailer props={props} handleOpen={handleOpen} />

                    {
                      trailersLength === 4 && i === 3 && totalTrailers > 4 &&
                        <button className={style.more} onClick={() => setTrailersLength(totalTrailers)}>
                          +{trailersLength && totalTrailers - trailersLength}
                        </button>
                    }
                  </li>
                )
              })
            }

            {
              trailersLength > 8 && 
                <li className={style.less} onClick={() => setTrailersLength(4)}>
                  <button title='less' ><MdKeyboardArrowUp /></button>
                </li>
            }
          </ul>
        </div>
      }

      {
        trailerUrl && <TrailerModal url={trailerUrl} handleClose={handleClose} />
      }
    </>
  );
}

export default Trailers;