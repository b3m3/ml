import BackBtn from '../UI/backBtn/BackBtn';
import Animation from './animation.svg';
import Pulse from './pulse.svg';

import style from './loading.module.scss';

const Loading = ({ page }) => {
  return (
    <div className={`${style.wrapp} ${page && style.page}`}>
      {
        page 
          ? <>
              <BackBtn />
              <img src={Animation} alt=" " />
            </>
          : <img src={Pulse} alt=" " />
      }
    </div>
  );
}

export default Loading;