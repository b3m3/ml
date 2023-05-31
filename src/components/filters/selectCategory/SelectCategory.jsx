import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTypeFromPathname, pathToStr, strToPath } from '../../../utils/functions';

import { MdArrowDropDown } from 'react-icons/md';

import style from './select-category.module.scss';

const categoriesMovie = ['Popular', 'Now playing', 'Upcoming', 'Top rated'];
const categoriesTv = ['Top rated', 'Popular', 'On the air', 'Airing today'];

const SelectCategory = () => {
  const { category } = useParams();

  const type = getTypeFromPathname();
  const categories = type === 'tv' ? categoriesTv : categoriesMovie;

  const setCategory = category ? pathToStr(category) : categories[0];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setCurrentCategory] = useState(setCategory);

  return (
    <div className={style.wrapp}>
      <div className={style.top} onClick={() => setIsOpen(a => !a)}>
        <p>{selectedCategory}</p>
        <MdArrowDropDown />
      </div>

      <ul className={`${style.body} ${isOpen ? style.open : ''}`}>
        {
          categories?.map((el, i) => {
            return (
              <li 
                key={i} 
                onClick={() => {
                  setCurrentCategory(el);
                  setIsOpen(false);
                }}
              >
                <Link to={`/${type}/${strToPath(el)}/1`}>{el}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default SelectCategory;