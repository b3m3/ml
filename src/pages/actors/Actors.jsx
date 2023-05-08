import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../store/slices/fetchDataSlice';

import PageNavigation from '../../components/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';

import style from './actors.module.scss';
import CardActor from '../../components/cardActor/CardActor';

const Actors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { page, category } = useParams();
  const { res, status } = useSelector(state => state.fetchData.data);

  useEffect(() => {
    navigate(`/person/popular/${page ? page : 1}`)
  }, [navigate, category, page]);

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

        { 
          status && <Error status={status.message} />
        }

        <PageNavigation 
          totalPages={res && +res.total_pages} 
          currentPage={+page}
          category={'popular'}
        />
      </div>
    </div>
  );
}

export default Actors;