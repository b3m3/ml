import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../store/slices/fetchDataSlice';

import CardVideo from '../../components/cardVideo/CardVideo';
import SelectCategory from '../../components/header/selectCategory/SelectCategory';
import PageNavigation from '../../components/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';

import style from './tv-shows.module.scss';

const categories = ['Popular', 'On the air', 'Airing today', 'Top rated'];

const TvShows = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, category } = useParams();
  const { res, status } = useSelector(state => state.fetchData.data);

  useEffect(() => {
    const doc = {
      type: 'tv',
      category: category ? category : 'popular',
      page: page ? page : 1
    }
    dispatch(fetchData(doc));
  }, [dispatch, page, category]);

  useEffect(() => {
    navigate(`/tv/${category ? category : 'popular'}/${page ? page : 1}`)
  }, [navigate, category, page]);

  return (
    <div className="container">
      <div className={style.wrapp}>
        <div className={style.top}>
          <SelectCategory categories={categories} />
        </div>

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

        { 
          status && <Error status={status.message} />
        }

        <PageNavigation 
          totalPages={res && +res.total_pages} 
          currentPage={+page}
          category={category}
        />
      </div>
    </div>
  );
}

export default TvShows;