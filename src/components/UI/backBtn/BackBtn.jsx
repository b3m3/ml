import { useNavigate } from 'react-router-dom';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs';

import style from './back-btn.module.scss';

const BackBtn = ({ ligth }) => {
  const navigate = useNavigate();

  return (
    <button 
      className={style.btn}
      onClick={() => navigate(-1)} 
    >
    <BsFillArrowLeftCircleFill 
      style={{color: `${ligth ? '#fff' : 'var(--blue-900)'}`}} 
    />
  </button>
  );
}

export default BackBtn;