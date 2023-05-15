import { Link } from 'react-router-dom';
import Poster from '../poster/Poster';

import { getTypeFromPathname } from '../../utils/functions';
import { TbUnlink } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';

import style from './card-video.module.scss';

const CardVideo = ({ 
  id, poster_path, media_type, backdrop_path, release_date, first_air_date, 
  title, name, vote_average, noHover, wide, t
}) => {
  const type = getTypeFromPathname();

  return (
    <div className={style.wrapp}>
      <Link 
        to={`/${media_type ? media_type : type}/${id}`}
        className={`${style.top} ${noHover && style.no_hover}`}
        style={wide ? {padding: '25% 0'} : null} 
      >
        <Poster url={wide ? backdrop_path : poster_path} size={'w500'}/>
        <TbUnlink />
      </Link>

      <div className={style.body}>
        <p>{title ? title : name}</p>

        <div className={style.body__row}>
          {
            !noHover && vote_average &&
              <p>
                <AiFillStar style={{color: "orange"}} />
                {vote_average}
              </p>
          }

          { 
            !noHover &&
              <p>
                {
                  release_date ? release_date.slice(0, 4) 
                    : first_air_date ? first_air_date.slice(0, 4) 
                    : null
                }
              </p>
          }
        </div>
      </div>
    </div>
  );
}

export default CardVideo;