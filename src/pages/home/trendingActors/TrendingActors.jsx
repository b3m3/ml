import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardActor from '../../../components/cardActor/CardActor';
import { fetchTrendingPersons } from '../../../store/slices/trendingSlice';

import style from './trending-actors.module.scss';

const TrendingActors = () => {
  const dispatch = useDispatch();

  const { trendingPersons } = useSelector(state => state.trending)

  useEffect(() => {
    dispatch(fetchTrendingPersons())
  }, [dispatch]);

  return (
    <>
      {
        trendingPersons.res && 
          <ul className={style.list}>
            {
              trendingPersons.res?.results?.slice(0, 8).map(props => {
                return (
                  <li key={props.id}>
                    <CardActor {...props} />
                  </li>
                )
              })
            }
          </ul>
      }
    </>
  );
}

export default TrendingActors;