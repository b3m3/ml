import { AiFillLike } from 'react-icons/ai';

import style from './votes.module.scss';

const Votes = ({ vote_count }) => {
  return (
    <>
      {
        vote_count &&
          <div className={style.votes}>
            <AiFillLike style={{color: 'var(--gray-400)'}} />
            {vote_count}
          </div>
      }
    </>
  );
}

export default Votes;