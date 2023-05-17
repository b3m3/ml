import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../store/slices/fetchDataSlice';

import CardVideo from '../../components/cardVideo/CardVideo';
import SelectCategory from '../../components/filters/selectCategory/SelectCategory';
import PageNavigation from '../../components/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';

import style from './movies.module.scss';

const categories = ['Popular', 'Now playing', 'Upcoming', 'Top rated'];

const Movies = () => {
  const dispatch = useDispatch();
  const { page, category } = useParams();
  const { res, status, loading } = useSelector(state => state.fetchData.data);

  useEffect(() => {
    const doc = {
      type: 'movie',
      category: category ? category : 'popular',
      page: page ? page : 1
    }
    dispatch(fetchData(doc));
  }, [dispatch, page, category]);

  return (
    <div className="container">
      <div className={style.wrapp}>
        <div className={style.top}>
          <SelectCategory categories={categories} />
        </div>
        
        {
          res &&
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

export default Movies;