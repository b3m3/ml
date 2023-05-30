import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchGenreslist } from '../../../store/slices/fetchDataSlice';
import Loading from '../../loading/Loading';

import { MdArrowDropDown } from 'react-icons/md';

import style from './genres.module.scss';

const Genres = ({ type, handleOptions, getParam }) => {  
  const isGenresOption = getParam('&with_genres=');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(isGenresOption ? [...new Set(isGenresOption.split(','))] : []);

  const dispatch = useDispatch();
  const { genresList } = useSelector(state => state.fetchData);
  
  const inputsRef = useRef([]);

  useEffect(() => {
    dispatch(fetchGenreslist({type}))
  }, [dispatch, type]);

  useEffect(() => {
    handleOptions({genres: selectedGenres?.join(',')});
  }, [selectedGenres]);

  const handleClick = (id, idx) => {
    if (!inputsRef.current[idx].checked) {
      return setSelectedGenres(c => [...c, id]);
    } 
    
    setSelectedGenres(c => c.filter(el => el !== id));
  }

  return (
    <div className={style.wrapp}>
      <div 
        className={style.top} 
        onClick={() => setIsOpen(a => !a)}
      >
        <p>Genres</p>
        <MdArrowDropDown />
        {
          Boolean(selectedGenres.length)  && <span>{selectedGenres.length}</span>
        }
      </div>

      <ul className={`${style.body} ${isOpen ? style.open : ''}`}>
        {
          genresList.res?.genres.map(({id, name}, i) => {

            return (
              <li key={id}>
                <input 
                  type="checkbox" 
                  id={id}
                  value={name}
                  ref={el => inputsRef.current[i] = el}
                  defaultChecked={selectedGenres.indexOf(id.toString()) !== -1}
                />
                <label 
                  htmlFor={id}
                  onClick={() => handleClick(id.toString(), i)}
                >
                  {name}
                </label>
              </li>
            )
          })
        }

        { genresList.loading && <Loading /> }
      </ul>
    </div>
  );
}

export default Genres;