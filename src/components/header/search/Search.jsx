import { FiSearch } from 'react-icons/fi';
// import { BsFilter } from 'react-icons/bs';

import style from './search.module.scss';

const Search = () => {
  return (
    <div className={style.wrapp}>
      <FiSearch />
      <input type="text" placeholder="Search" />
      {/* <BsFilter /> */}
    </div>
  );
}

export default Search;