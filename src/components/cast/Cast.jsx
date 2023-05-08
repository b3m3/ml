import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CardActor from '../cardActor/CardActor';
import { fetchCast } from '../../store/slices/fetchDataSlice';

import { MdKeyboardArrowUp } from 'react-icons/md';

import style from './cast.module.scss';

const Cast = ({ type, id }) => {
  const [castLength, setCastLength] = useState(8);

  const dispatch = useDispatch();
  const { cast } = useSelector(state => state.fetchData);
  
  useEffect(() => {
    dispatch(fetchCast({ type, id }));
  }, [dispatch, type, id]);

  const totalCast = cast?.res?.cast.length;

  return (
    <>
      {
        Boolean(cast?.res?.cast.length) &&
        <div className={style.wrapp}>
          <h5>The cast</h5>

          <ul>
            {
              cast?.res?.cast.slice(0, castLength).map((props, i) => {
                return (
                  <li 
                    key={props.id}
                    className={castLength === 8 && i === 7 ? style.last : ''}
                  >
                    <CardActor {...props} noHover />
                    
                    {
                      castLength === 8 && i === 7 && totalCast > 8 &&
                        <button className={style.more} onClick={() => setCastLength(totalCast)}>
                          +{castLength && totalCast - castLength}
                        </button>
                    }
                  </li>
                )
              })
            }

            {
              castLength > 8 && 
                <li className={style.less} onClick={() => setCastLength(8)}>
                  <button title='less' ><MdKeyboardArrowUp /></button>
                </li>
            }
          </ul>
        </div>
      }
    </>
  );
}

export default Cast;