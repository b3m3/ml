import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../store/slices/fetchDataSlice';

import CardVideo from '../../components/cardVideo/CardVideo';
import PageNavigation from '../../components/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Filters from '../../components/filters/Filters';

import style from './tv-shows.module.scss';

const TvShows = () => {
  const dispatch = useDispatch();
  const { page, category, filters } = useParams();
  const { res, status, loading } = useSelector(state => state.fetchData.data);

  useEffect(() => {
    if (!filters) {
      const doc = {
        type: 'tv',
        category: category ? category : 'popular',
        page: page ? page : 1
      }
      
      dispatch(fetchData(doc));
    }
  }, [dispatch, page, category, filters]);

  return (
    <div className="container">
      <div className={style.wrapp}>
        <div className={style.top}>
          <Filters />
        </div>

        {
          Boolean(res?.results.length) &&
            <>
              <ul className={style.body}>
                {
                  res?.results.map(props => {
                    return (
                      <li key={props.id}>
                        <CardVideo {...props} />
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

export default TvShows;