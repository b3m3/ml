import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import style from './trailer-modal.module.scss';

const TrailerModal = ({ url, handleClose }) => {
  return (
    <div className={style.wrapp}>
      <button onClick={handleClose} className={style.back}>
        <BsFillArrowLeftCircleFill />
      </button>

      <div className={style.body}>
        <iframe
          src={url && `https://www.youtube.com/embed/${url}/?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TrailerModal;