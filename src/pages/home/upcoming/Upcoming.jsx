import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../../store/slices/fetchDataSlice';
import CardUpcoming from './cardUpcoming/CardUpcoming';

import style from './upcoming.module.scss';

const Upcoming = () => {
  const dispatch = useDispatch();

  const { res } = useSelector(state => state.fetchData.data)

  useEffect(() => {
    const doc = {
      type: 'movie',
      category: 'upcoming',
      page: 1
    }
    dispatch(fetchData(doc))
  }, [dispatch]);

  return (
    <>
      {
        res && 
          <div className={style.wrapp}>
            <h3>Upcoming</h3>

            <ul>
              {
                res.results?.slice(0, 6).map(props => {
                  return (
                    <li key={props.id}>
                      <CardUpcoming {...props} />
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

export default Upcoming;