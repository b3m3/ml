import BackBtn from '../UI/backBtn/BackBtn';
import style from './error.module.scss';

const Error = ({ status }) => {
  return (
    <div className={style.wrapp}>
      <BackBtn />
      {status}
    </div>
  );
}

export default Error;