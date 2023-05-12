import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardVideo from '../cardVideo/CardVideo';
import { fetchRecomendations } from '../../store/slices/fetchDataSlice';

import style from './recommendations.module.scss';

const Recommendations = ({ type, id }) => {
  const dispatch = useDispatch();
  const { recommendations } = useSelector(state => state.fetchData);

  useEffect(() => {
    dispatch(fetchRecomendations({ type, id }));
  }, [dispatch, type, id]);

  return (
    <>
      {
        Boolean(recommendations?.res?.results.length) &&
          <div className={style.wrapp}>
            <h5>Recommendations</h5>

            <ul>
              {
                recommendations?.res?.results.map(props => {
                  return (
                    !props.adult &&
                    <li key={props.id}>
                      <CardVideo {...props} noHover />
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

export default Recommendations;