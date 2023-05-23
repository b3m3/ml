import { useState } from 'react';
import style from './overview.module.scss';

const Overview = ({ overview, biography }) => {
  const [full, setFull] = useState(false);

  return (
    <>
      {
        (overview || biography) &&
          <div className={style.wrapp}>
            <h5>{ biography ? 'Biography' : 'Overview' }</h5>
            <p
              style={full ? {WebkitLineClamp: 'unset'} : null}
              onClick={() => setFull(a => !a)}
            >
              { biography ? biography : overview}
            </p>
          </div>
      }
    </>
  );
}

export default Overview;