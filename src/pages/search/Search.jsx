import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CardVideo from '../../components/cardVideo/CardVideo';
import PageNavigation from '../../components/pageNavigation/PageNavigation';
import Error from '../../components/error/Error';
import { fetchSearchData } from '../../store/slices/searchSlice';
import { getTypeFromPathname } from '../../utils/functions';

import style from './search.module.scss';
import CardActor from '../../components/cardActor/CardActor';

const Search = () => {
  const dispatch = useDispatch();

  const { page, query } = useParams();
  const { res, status } = useSelector(state => state.search.data);

  const type = getTypeFromPathname();
  const isActors = type === 'person';

  useEffect(() => {
    const doc = {
      type,
      query,
      page: page ? page : 1
    }
    
    dispatch(fetchSearchData(doc))
  }, [dispatch, page, type, query])

  return (
    <div className="container">
      <div className={style.wrapp}>
        <div className={style.top}>
          <h4>Search: {query}</h4>
        </div>

        <ul className={style.body}>
          {
            res?.results?.map(props => {
              return (
                <li key={props.id}>
                  {
                    isActors
                    ? <CardActor {...props} />
                    : <CardVideo {...props} />
                  }
                  
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
          currentPage={page ? +page : 1}
        />
      </div>
    </div>
  );
}

export default Search;