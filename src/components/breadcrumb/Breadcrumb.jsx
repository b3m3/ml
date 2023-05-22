import { Link, useNavigate } from 'react-router-dom';

import { getTypeFromPathname } from '../../utils/functions';
import { pathToStr } from '../../utils/functions';

import style from './breadcrumb.module.scss';

const Breadcrumb = () => {
  const navigate = useNavigate();
  
  const type = getTypeFromPathname();
  const name = pathToStr(type);

  const linkName = name === "Person" ? "Actors" : name === "Tv" ? "Tv shows" : name === "Movie" ? "Movies" : name;

  return (
    <ul className={style.wrapp}>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={`/${type}`}>{linkName}</Link>
      </li>
      <li>
        <button onClick={() => navigate(-1)}>Back</button>
      </li>
    </ul>
  );
}

export default Breadcrumb;