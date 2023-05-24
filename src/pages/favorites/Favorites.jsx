import { useState } from 'react';
import { useSelector } from 'react-redux';

import CardVideo from '../../components/cardVideo/CardVideo';
import Select from './select/Select';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

import style from './favorites.module.scss';

const Favorites = () => {
  const [currentType, setCurrentType] = useState('');
  const { favoriteMovies, favoriteTv } = useSelector(state => state.favorite);

  const favoritelist = currentType === 'Movies' ? favoriteMovies : favoriteTv;
  const media_type= currentType === 'Movies' ? 'movie' : 'tv';

  return (
    <div className="container">
      <div className={style.wrapp}>
        <div className={style.top}>
          <Select currentType={currentType} setCurrentType={setCurrentType} />
        </div>

        {
          favoritelist.res &&
            <ul className={style.body}>
              {
                favoritelist.res?.map(props => {
                  return (
                    <li key={props.id}>
                      <CardVideo {...props} media_type={media_type} />
                    </li>
                  )
                })
              }
            </ul>
        }
        
        { 
          favoritelist.status && <Error status={favoritelist.status.message} page />
        }

        {
          favoritelist.loading && <Loading />
        }
      </div>
    </div>
  );
}

export default Favorites;