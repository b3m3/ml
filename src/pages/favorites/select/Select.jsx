import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { MdArrowDropDown } from 'react-icons/md';

import style from './select.module.scss';
import { pathToStr, strToPath } from '../../../utils/functions';

const arr = ['Movies', 'Tv shows'];

const Select = ({ currentType, setCurrentType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { type } = useParams();
  
  useEffect(() => {
    setCurrentType(type ? pathToStr(type) : arr[0]);
  }, [setCurrentType, type]);

  return (
    <div className={style.wrapp}>
      <div className={style.top} onClick={() => setIsOpen(a => !a)}>
        <p>{currentType}</p>
        <MdArrowDropDown />
      </div>

      <ul className={`${style.body} ${isOpen ? style.open : ''}`}>
        {
          arr?.map((el, i) => {
            return (
              <li 
                key={i} 
                onClick={() => {
                  setCurrentType(el);
                  setIsOpen(false);
                }}
              >
                <Link to={`/favorite/${strToPath(el)}`}>
                  {el}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Select;