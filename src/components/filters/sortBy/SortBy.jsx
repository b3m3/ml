import { useEffect, useState } from 'react';

import { MdArrowDropDown } from 'react-icons/md';

import style from './sort-by.module.scss';

const categories = [
  {name: 'Popularity', option: 'popularity.desc'},
  {name: 'Rating', option: 'vote_average.desc'},
  {name: 'Votes', option: 'vote_count.desc'},
  {name: 'Release date', option: 'primary_release_date.desc'}
]

const SortBy = ({ handleOptions, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Popularity');

  useEffect(() => {
    categories.map(({name, option}) => option === options?.sort_by && setSelectedFilter(name));
  }, [options])

  return (
    <div className={style.wrapp}>
      <div 
        className={style.top} 
        onClick={() => setIsOpen(a => !a)}
      >
        <p>{selectedFilter}</p>
        <MdArrowDropDown />
      </div>

      <ul className={`${style.body} ${isOpen ? style.open : ''}`}>
        {
          categories?.map(({name, option}) => {
            return (
              <li 
                key={name}
                onClick={() => {
                  setSelectedFilter(name);
                  setIsOpen(false);
                  handleOptions({sort_by: option});
                }}
              >
                {name}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default SortBy;