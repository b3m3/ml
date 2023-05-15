import { Link, useLocation, useParams } from 'react-router-dom';
import { getTypeFromPathname } from '../../utils/functions';

import style from './page-navigation.module.scss';

const PageNavigation = ({ totalPages, currentPage, category }) => {
  const { pathname } = useLocation();
  const { query } = useParams();

  
  const type = getTypeFromPathname();
  const isSearch = pathname.indexOf('search') !== -1;

  const total = totalPages && totalPages > 500 ? 500 : totalPages;

  const link = isSearch ? `/${type}/search/${query}/` : `/${type}/${category}/`;
  const activeStyle = {color: 'var(--blue-400)'};

  return (
    <>
      {
        total && total > 1 &&
        <div className={style.wrapp}>
          <ul>
            <li style={currentPage === 1 ? activeStyle : null}> 
              <Link to={link + 1}>{1}</Link> 
            </li>
            <li>...</li>
            {
              currentPage > 3 && 
                <li >
                  <Link to={`${link}${currentPage - 2}`}>{currentPage - 2}</Link>
                </li>
            }
            {
              currentPage > 2 && 
                <li >
                  <Link to={`${link}${currentPage - 1}`}>{currentPage - 1}</Link>
                </li>
            }
            {
              currentPage > 1 && currentPage < total &&
                <li style={activeStyle}>
                  <Link to={`${link}${currentPage}`}>{currentPage}</Link>
                </li>
            }
            {
              currentPage + 1 < total && 
                <li >
                  <Link to={`${link}${currentPage + 1}`}>{currentPage + 1}</Link>
                </li>
            }
            {
              currentPage + 2 < total &&
                <li >
                  <Link to={`${link}${currentPage + 2}`}>{ currentPage + 2}</Link>
                </li>
            }
            <li>...</li>
            <li style={currentPage === total ? activeStyle : null}>
              <Link to={link + total}>{total}</Link>
            </li>
          </ul>
        </div>
      }
    </>
  );
}

export default PageNavigation;