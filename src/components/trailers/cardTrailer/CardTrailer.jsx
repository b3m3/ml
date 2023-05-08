import { BsPlayFill } from 'react-icons/bs';

import style from './card-trailer.module.scss';

const CardTrailer = ({ props, handleOpen }) => {
  const { key } = props && props;

  return (
    <div 
      className={style.wrapp}
      onClick={() => handleOpen(key)}
    >
      <img src={key &&`https://img.youtube.com/vi/${key}/mqdefault.jpg`} alt="Youtube trailer" />

      <span>
        <BsPlayFill />
      </span>
    </div>
  );
}

export default CardTrailer;