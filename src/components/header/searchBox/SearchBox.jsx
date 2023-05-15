import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ListItems from './listItems/ListItems';
import { clearSearchData, searchMovies, searchPersons, searchTvShows } from '../../../store/slices/searchSlice';

import { FiSearch } from 'react-icons/fi';
import { MdOutlineClear } from 'react-icons/md'

import style from './search-box.module.scss';

const listItems = ['Movies', 'Tv shows', 'Actors'];

const SearchBox = () => {
  const [value, setValue] = useState('');
  const { movies, tvShows, persons } = useSelector(state => state.search);

  const dispatch = useDispatch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value) {
        dispatch(searchMovies({ query: value }));
        dispatch(searchTvShows({ query: value }));
        dispatch(searchPersons({ query: value }));
      } else {
        dispatch(clearSearchData());
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [dispatch, value]);

  const clearValue = () => {
    setValue('')
  }

  const isResults = Boolean(movies.res?.results?.length) 
    || Boolean(tvShows.res?.results?.length) 
    || Boolean(persons.res?.results?.length);

  const results = [movies, tvShows, persons];

  return (
    <div className={style.wrapp}>
      <FiSearch />

      {
        value &&
          <MdOutlineClear 
            className={style.clear} 
            onClick={clearValue}
          />
      }

      <input 
        type="text" 
        placeholder="Search" 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      
      {
        isResults &&
          <div className={style.body}>
            {
              listItems.map((item, i) => {
                return (
                  <ListItems
                    key={item}
                    title={item} 
                    results={results[i].res?.results} 
                    value={value}
                    clearValue={clearValue}
                  />
                )
              })
            }
          </div>
      }
    </div>
  );
}

export default SearchBox;