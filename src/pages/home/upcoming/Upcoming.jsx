import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../../store/slices/fetchDataSlice';
import CardUpcoming from './cardUpcoming/CardUpcoming';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';

import style from './upcoming.module.scss';

const Upcoming = () => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.fetchData)

  useEffect(() => {
    const doc = {
      type: 'movie',
      category: 'upcoming',
      page: 1
    }
    dispatch(fetchData(doc))
  }, [dispatch]);

  return (
    <div className={style.wrapp}>
      <h3>Upcoming</h3>

      {
        data.res && 
          <ul>
            {
              data.res?.results?.slice(0, 8).map(props => {
                return (
                  <li key={props.id}>
                    <CardUpcoming {...props} />
                  </li>
                )
              })
            }
          </ul>
      }

      { data.loading && <Loading /> }

      {
        data.status && 
          <Error status={data.status?.message} />
      }
    </div>
  );
}

export default Upcoming;