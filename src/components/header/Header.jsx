import { useSelector } from 'react-redux';

import Search from './search/Search';
import CurrentTime from './currentTime/CurrentTime';
import User from './user/User';

import style from './header.module.scss';

const Header = () => {
  const { isActivePage } = useSelector(state => state.activePage)

  const wrappStyle = isActivePage ? {padding: "0 1rem"} : null;

  return (
    <div className={isActivePage ? "" : "container"}>
      <header className={style.wrapp} style={wrappStyle}>
        <div className={style.col}>
          {
            !isActivePage && <Search />
          }
        </div>
        <div className={style.col}>
          <User />
          <CurrentTime />
        </div>
      </header>
    </div>
  );
}

export default Header;