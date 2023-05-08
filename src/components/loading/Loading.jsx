import BackBtn from '../UI/backBtn/BackBtn';

import style from './loading.module.scss';

const Loading = () => {
  return (
    <div className={style.wrapp}>
      <h2>...Loading</h2>
      
      <BackBtn />
    </div>
  );
}

export default Loading;