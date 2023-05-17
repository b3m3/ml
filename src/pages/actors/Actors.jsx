import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../store/slices/fetchDataSlice';

import PageNavigation from '../../components/pageNavigation/PageNavigation';
import CardActor from '../../components/cardActor/CardActor';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';

import style from './actors.module.scss';

const Actors = () => {
  const dispatch = useDispatch();
  const { page, category } = useParams();
  const { res, status, loading } = useSelector(state => state.fetchData.data);

  useEffect(() => {
    const doc = {
      type: 'person',
      category: 'popular',
      page: page ? page : 1
    }
    dispatch(fetchData(doc));
  }, [dispatch, page, category]);

  return (
    <div className="container">
      <div className={style.wrapp}>
        {
          res &&
            <>
              <ul className={style.body}>
                {
                  res?.results.map(props => {
                    return (
                      <li key={props.id}>
                        <CardActor {...props} />
                      </li>
                    )
                  })
                }
              </ul>

              <PageNavigation 
                totalPages={res && +res.total_pages} 
                currentPage={page ? +page : 1}
                category={category ? category : 'popular'}
              />
            </>
        }

        { 
          status && <Error status={status.message} page />
        }

        {
          loading && <Loading />
        }
      </div>
    </div>
  );
}

export default Actors;