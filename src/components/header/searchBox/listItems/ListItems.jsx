import CardVideo from '../../../cardVideo/CardVideo';
import CardActor from '../../../cardActor/CardActor';
import Loading from '../../../loading/Loading';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSearchData } from '../../../../store/slices/searchSlice';

import style from './list-items.module.scss';

const ListItems = ({ title, value, results, clearValue, loading }) => {
  const dispatch = useDispatch();

  const isActors = title?.toLowerCase() === 'actors';

  const media_type = 
    title?.toLowerCase() === 'movies' ? 'movie' 
    : title?.toLowerCase() === 'tv shows' ? 'tv'
    : title?.toLowerCase() === 'actors' ? 'person'
    : null;

  const handleClick = () => {
    dispatch(clearSearchData());
    clearValue();
  }

  return (
    <>
      {
        Boolean(results?.length) &&         
          <div className={style.wrapp}>
            <div className={style.top}>
              <p>{title}</p>
            </div>

            <ul>
              {
                results?.slice(0, 3).map(props => {
                  return (
                    <li key={props.id}>
                      {
                        isActors
                        ? <CardActor {...props} noHover /> 
                        : <CardVideo {...props} noHover media_type={media_type} />
                      }
                    </li>
                  )
                })
              }
            </ul>

            <Link
              className={style.more}
              to={`/${media_type}/search/${value}/1`}
              onClick={handleClick}
            >
              Get more results...
            </Link>
          </div>
      }

      {
        loading && <Loading />
      }
    </>
  );
}

export default ListItems;