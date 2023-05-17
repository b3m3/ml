import LogoSvg from './logo.svg';

import style from './logo.module.scss';

const Logo = () => {
  return (
    <div className={style.wrapp}>
      <img src={LogoSvg} alt="Logo" />
    </div>
  );
}

export default Logo;