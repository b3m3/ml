import { useDispatch, useSelector } from 'react-redux';

import { setCurrentCategory } from '../../../store/slices/currentCategorySlice';
import { MdArrowDropDown } from 'react-icons/md';

import style from './select-category.module.scss';
import { useState } from 'react';

const movieCategories = ['Popular', 'Now playing', 'Top rated'];
// const tvShowCategories = ['Popular', 'On the air', 'Top rated'];

const SelectCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentCategory } = useSelector(state => state.category);

  const dispatch = useDispatch();

  const handleCategory = (index) => {
    dispatch(setCurrentCategory(index));
  }

  return (
    <div className={style.wrapp}>
      <div className={style.top}>
        <p onClick={() => setIsOpen(true)}>{movieCategories[currentCategory]}</p>
        <MdArrowDropDown />
      </div>

      <ul 
        className={`${style.body} ${isOpen ? style.open : ''}`}
      >
        {
          movieCategories.map((el, i) => {
            return (
              <li 
                key={i} 
                onClick={() => {
                  handleCategory(i);
                  setIsOpen(false);
                }}
              >
                {el}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default SelectCategory;