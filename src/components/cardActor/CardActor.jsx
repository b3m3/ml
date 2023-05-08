import { Link } from 'react-router-dom';
import Poster from '../poster/Poster';

import { BsPersonLinesFill } from 'react-icons/bs';

import style from './card-actor.module.scss';

const CardActor = ({ id, profile_path, name, noHover }) => {
  return (
    <div className={style.wrapp}>
      <Link 
        className={`${style.top} ${noHover && style.no_hover}`} 
        to={`/person/${id}`}
      >
        <Poster url={profile_path} size={'w500'}/>
        <BsPersonLinesFill />
      </Link>

      <div className={style.body}>
        <p>{name && name}</p>
      </div>
    </div>
  );
}

export default CardActor;