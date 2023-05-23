import { useState } from 'react';
import { IMG_ROOT } from '../../constants/api';

import NoPoster from './noPoster.webp';

import style from './poster.module.scss';

const Poster = ({ url, size }) => {
  const [load, setload] = useState(true);

  return (
    <>
      {
        load && 
          <img 
            className={style.image}
            src={NoPoster}
            alt=" "
            style={{objectFit: 'contain'}}
          />
      }

      <img
        className={style.image}
        src={url ? `${IMG_ROOT}/${size}${url}` : NoPoster}
        alt=" "
        style={url ? null : {objectFit: 'contain'}}
        onLoad={() => setload(false)}
      />
    </>
  );
}

export default Poster;