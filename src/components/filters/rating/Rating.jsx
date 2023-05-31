import { useEffect, useState } from 'react';

import MultiRangeSlider from '../multiRangeSlider/MultiRangeSlider';
import { MdArrowDropDown } from 'react-icons/md';

import style from './rating.module.scss';

const Rating = ({ handleOptions, getParam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const isMinOption = getParam('&vote_average.gte=');
  const isMaxOption = getParam('&vote_average.lte=');

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleOptions({rating: {min, max}})
    }, 1000);

    return () => clearTimeout(debounce);
  }, [min, max, handleOptions])

  return (
    <div className={style.wrapp}>
      <div 
        className={style.top} 
        onClick={() => setIsOpen(a => !a)}
      >
        <p>Rating</p>
        <MdArrowDropDown />
        <span>{min}-{max}</span>
      </div>

      <div className={`${style.body} ${isOpen ? style.open : ''}`}>
        <MultiRangeSlider 
          min={1}
          max={10}
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

export default Rating;