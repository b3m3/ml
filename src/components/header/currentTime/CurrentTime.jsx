import style from './current-time.module.scss';

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const CurrentTime = () => {
  return (
    <div className={style.wrapp}>
      <div className={style.time}>
        <span>09</span>
        <span> : </span>
        <span>27</span>
      </div>
      <div className={style.date}>
        <div className={style.date__row}>
          <span>April</span>
          <span>05</span>
        </div>

        <p className={style.date__day}>Wednesday</p>
      </div>
    </div>
  );
}

export default CurrentTime;