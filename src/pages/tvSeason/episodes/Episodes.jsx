import { Link, useParams } from 'react-router-dom';
import Poster from '../../../components/poster/Poster';

import style from './episodes.module.scss';

const Episodes = ({ episodes }) => {
  const { id, season_number } = useParams();

  const tvId = id;

  return (
    <>
      {
        episodes && 
        <div className={style.wrapp}>
          <h5>Episodes</h5>

          <ul>
            {
              episodes?.map(({ id, overview, episode_number, still_path }) => {
                return (
                  <li key={id}>
                    <Link to={`/tv/${tvId}/season/${season_number}/episode/${episode_number}`}>
                      <div className={style.image}>
                        <Poster url={still_path} size={'w500'} />
                      </div>

                      <h4>Episode {episode_number}</h4>
                      <p>{overview}</p>
                    </Link>
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

export default Episodes;