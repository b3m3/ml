import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';

import { Link } from 'react-router-dom';
import Poster from '../../../../components/poster/Poster';
import style from './card-upcoming.module.scss';

const CardUpcoming = ({ id, poster_path, title }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en`)
      .then(data => setResults(data.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <Link 
      className={style.wrapp}
      to={`/movie/${id}`}
    >
      <div className={style.top}>
        <Poster url={poster_path} size={'w300'} />
      </div>

      {
        results?.runtime &&
          <span className={style.time}>{results?.runtime} min</span>
      }

      <div className={style.body}>
        <h5>Movie</h5>
        <h3>{title && title}</h3>

        {
          results?.genres &&
            <ul>
              {
                results?.genres?.slice(0, 3).map(({id, name}) => {
                  return (
                    <li key={id}>
                      {name}
                    </li>
                  )
                })
              }
            </ul>
        }
      </div>
    </Link>
  );
}

export default CardUpcoming;