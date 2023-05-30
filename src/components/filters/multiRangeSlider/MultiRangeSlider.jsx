import React, { useCallback, useEffect, useState, useRef } from "react";

import style from './multi-range-slider.module.scss';

const MultiRangeSlider = ({ min, max, step, isMinOption, isMaxOption, onChange }) => {
  const [minVal, setMinVal] = useState(isMinOption ? +isMinOption : min);
  const [maxVal, setMaxVal] = useState(isMaxOption ? +isMaxOption : max);

  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback((value) => 
    Math.round(((value - min) / (max - min)) * 100
  ),[min, max]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={style.wrapp}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        ref={minValRef}
        className={style.thumb + ' ' + style.thumb_z3 + ' ' + style.thumb_z5}
        onChange={e => {
          const value = Math.min(+e.target.value, maxVal - step);
          setMinVal(value);
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        ref={maxValRef}
        className={style.thumb + ' ' + style.thumb_z4}
        onChange={e => {
          const value = Math.max(+e.target.value, minVal + step);
          setMaxVal(value);
        }}
      />

      <div className={style.slider}>
        <div className={style.track}/>
        <div className={style.range} ref={range}/>
        <div className={style.left}>{minVal}</div>
        <div className={style.right}>{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
