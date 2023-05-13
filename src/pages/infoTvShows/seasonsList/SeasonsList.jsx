import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MdKeyboardArrowUp } from 'react-icons/md';

import style from './seasons-list.module.scss';
import Poster from '../../../components/poster/Poster';

const SeasonsList = ({ seasons }) => {
  const [seasonsLength, setSeasonsLength] = useState(6);
  const { id } = useParams();
  
  const totalSeasons = seasons?.length;

  return (
    <>
      {
        Boolean(seasons?.length) &&
        <div className={style.wrapp}>
          <h5>Seasons</h5>

          <ul>
            {
              seasons?.slice(0, seasonsLength).map(({ name, poster_path, season_number }, i) => {
                return (
                  <li key={season_number}>
                    <Link to={`/tv/${id}/season/${season_number}`}>
                      <Poster url={poster_path} size={'w500'} />
                    </Link>

                    <p>{name}</p>

                    {
                      seasonsLength === 6 && i === 5 && totalSeasons > 6 &&
                        <button className={style.more} onClick={() => setSeasonsLength(totalSeasons)}>
                          +{seasonsLength && totalSeasons - seasonsLength}
                        </button>
                    }
                  </li>
                )
              })
            }

            {
              seasonsLength > 6 && 
                <li className={style.less} onClick={() => setSeasonsLength(6)}>
                  <button title='less' ><MdKeyboardArrowUp /></button>
                </li>
            }
          </ul>
        </div>
      }
    </>
  );
}

export default SeasonsList;