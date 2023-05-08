import { IMG_ROOT } from '../../constants/api';

import NoPoster from './noPoster.webp';

import style from './poster.module.scss';

const Poster = ({ url, size }) => {
  return (
    <img
      className={style.image}
      src={url ? `${IMG_ROOT}/${size}${url}` : NoPoster}
      alt=" "
    />
  );
}

export default Poster;