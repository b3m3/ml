import { AiFillStar } from 'react-icons/ai';

import style from './rating.module.scss';

const Rating = ({ vote_average }) => {
  return (
    <>
      {
        vote_average &&
          <div className={style.rating}>
            <AiFillStar style={{color: 'var(--gray-400)'}} />
            {vote_average?.toString().slice(0, 3)}
          </div>
      }
    </>
  );
}

export default Rating;