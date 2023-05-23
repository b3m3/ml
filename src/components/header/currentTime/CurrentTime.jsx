import { useEffect, useState, memo } from 'react';
import { addZero } from '../../../utils/functions';

import style from './current-time.module.scss';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const CurrentTime = memo(() => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  
  const date = new Date();

  const weekDay = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();

  useEffect(() => {
    const interval = setInterval(() => {
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();

      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000)

    return () =>  clearInterval(interval);
  }, [date, seconds]);

  return (
    <div className={style.wrapp}>
      <div className={style.time}>
        <span>{ hours ? addZero(hours) : '--' }</span>
        <span>:</span>
        <span>{ minutes ? addZero(minutes) : '--' }</span>
      </div>
      <div className={style.date}>
        <div className={style.date__row}>
          <span>{ months[month] }</span>
          <span>{ addZero(day) }</span>
        </div>

        <p className={style.date__day}>{ days[weekDay] }</p>
      </div>
    </div>
  );
});

export default CurrentTime;