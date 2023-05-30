import { useEffect, useState } from 'react';

import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';
import { MdArrowDropDown } from 'react-icons/md';

import style from './release-date.module.scss';

const ReleaseDate = ({ handleOptions, getParam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const isMinOption = getParam('&primary_release_date.gte=');
  const isMaxOption = getParam('&primary_release_date.lte=');

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleOptions({release_date: {min, max}})
    }, 1000);

    return () => clearTimeout(debounce);
  }, [min, max]);

  const currentYear = new Date().getFullYear();

  return (
    <div className={style.wrapp}>
      <div 
        className={style.top} 
        onClick={() => setIsOpen(a => !a)}
      >
        <p>Release date</p>
        <MdArrowDropDown />
      </div>

      <div className={`${style.body} ${isOpen ? style.open : ''}`}>
        <MultiRangeSlider 
          min={1970}
          max={currentYear}
          step={1}
          isMinOption={isMinOption}
          isMaxOption={isMaxOption}
          onChange={({min, max}) => {
            setMin(min);
            setMax(max);
          }}
        />
      </div>
    </div>
  );
}

export default ReleaseDate;