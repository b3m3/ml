import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardVideo from '../../../components/cardVideo/CardVideo';
import { fetchPersonMediaData } from '../../../store/slices/personSlice';
import { unique } from '../../../utils/functions';

import style from './known-for.module.scss';

const KnownFor = ({ id }) => {
  const dispatch =  useDispatch();
  const { mediaData } = useSelector(state => state.person);

  useEffect(() => {
    dispatch(fetchPersonMediaData({ id }));
  }, [dispatch, id]);
  
  return (
    <>
      {
        Boolean(mediaData.res?.cast.length) &&
        <div className={style.wrapp}>
          <h5>Known for</h5>
          <ul>
            {
              mediaData?.res?.cast && 
                unique(mediaData.res.cast).map((props, i) => {
                  return (
                    !props.adult &&
                      <li key={props.id}>
                        <CardVideo {...props} noHover />
                      </li>
                  )
                }
              )
            }
          </ul>
        </div>
      }
    </>
  );
}

export default KnownFor;